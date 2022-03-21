const { Router } = require("express");
const router = Router();
const { firestore } = require("../database");
const { body, validationResult, param } = require("express-validator");
const verifyToken = require("./authJwt");

router.get("/", async (req, res) => {
  try {
    const data = await firestore
      .collection("cakes")
      .where("isNew", "==", true)
      .get();
    const docs = data.docs.map((x) => {
      return {
        id: x.id,
        cake: x.data(),
      };
    });
    return res.status(200).json({ collection: docs });
  } catch (e) {
    res.status(500).json({
      message: "При загрузке произошла ошибка!",
    });
  }
});

/**
 * Добавление в новинки
 * @param {String} id - id товара
 */
router.post(
  "/:id",
  verifyToken,
  param("id", "Id товара должен быть").exists(),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Отсутсвует ID",
        });
      }
      const id = req.params.id;
      const doc = await firestore.collection("cakes").doc(id).get();
      if (doc.exists) {
        await firestore.collection("cakes").doc(id).update({ isNew: true });
        return res.status(200).json({ message: "Новинка добавлена!" });
      }
      return res.status(400).json({ message: "Неверный ID!" });
    } catch (e) {
      res.status(500).json({
        message: "При загрузке произошла ошибка!",
      });
    }
  }
);

/**
 * Delete cake
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
      const doc = await firestore.collection("cakes").doc(id).get();
      if (doc.exists) {
        await firestore.collection("cakes").doc(id).update({ isNew: false });
        return res.status(200).json({ message: "Новинка удалена!" });
      }
      return res.status(400).json({ message: "Неверный ID!" });
    } catch (e) {
      res.status(500).json({
        message: "При удалении произошла ошибка!",
      });
    }
  }
);
module.exports = router;
