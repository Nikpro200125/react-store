const { Router } = require("express");
const { body, validationResult, param } = require("express-validator");
const router = Router();
const { firestore } = require("../database");
const verifyToken = require("./authJwt");
const cakeTypes = ["cream", "base", "filling"];

/**
 * Post cake into DB
 * @param {String} id - Передается в параметром в url
 * @param {String} name - Название item
 */
router.post(
  "/:type",
  verifyToken,
  // Checking parameters
  param("type", "Необходим ID объекта").exists(),
  body("name", "Имя должно быть минумум 3 символа и уникальным").isLength({
    min: 2,
  }),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Некорректные данные для торта",
        });
      }
      const type = req.params.type;
      if (cakeTypes.includes(type)) {
        await firestore.collection("cupcakes").add({
          type: type,
          name: req.body.name,
        });
        return res.status(201).json({
          message: "Item загружен",
        });
      }
      res.status(400).json({ message: "Неверный type" });
    } catch (e) {
      res.status(500).json({
        message: "При загрузке произошла ошибка!",
      });
    }
  }
);

/**
 * Get cupcake collection
 */
router.get(
  "/:type",
  param("type", "Необходим ID объекта").exists(),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Некорректные данные для item",
        });
      }
      const type = req.params.type;
      if (cakeTypes.includes(type)) {
        const data = await firestore
          .collection("cupcakes")
          .where("type", "==", type)
          .get();
        const docs = data.docs.map((x) => {
          return {
            id: x.id,
            item: x.data(),
          };
        });
        return res.status(200).json({ collection: docs });
      }
      res.status(400).json({ message: "Неверный type" });
    } catch (e) {
      res.status(500).json({
        message: "При получении произошла ошибка!",
      });
    }
  }
);

/**
 * Delete item
 * @param {String} id - Передается в параметром в url
 */
router.delete(
  "/:id",
  verifyToken,
  param("id", "Необходим ID объекта").exists(),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Некорректные данные ID",
        });
      }
      const id = req.params.id;
      const doc = await firestore.collection("cupcakes").doc(id).get();
      if (!doc.exists) {
        return res.status(400).json({ message: "Неверный ID" });
      }
      await firestore.collection("cupcakes").doc(id).delete();
      return res.status(201).json({ message: "Item удален!" });
    } catch (e) {
      res.status(500).json({
        message: "При удалении произошла ошибка!",
      });
    }
  }
);

/**
 * Update Cake
 * @param {String} id - Передается в параметром в url
 * @param {String} name - Название item
 */
router.put(
  "/:id",
  verifyToken,
  // Checking parameters
  param("id", "Необходим ID объекта").exists(),
  body("name", "Имя должно быть минумум 3 символа и уникальным").isLength({
    min: 3,
  }),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Некорректные данные для торта",
        });
      }
      const id = req.params.id;
      const doc = await firestore.collection("cupcakes").doc(id).get();
      if (!doc.exists) {
        return res.status(400).json({ message: "Неверный ID" });
      }
      await firestore.collection("cakes").doc(id).update({
        name: req.body.name,
      });
      return res.status(201).json({
        message: "Торт обновлен",
      });
    } catch (e) {
      console.log(e);
      res.status(500).json({
        message: "При обновлении произошла ошибка!",
      });
    }
  }
);
module.exports = router;
