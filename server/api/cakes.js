const { Router } = require("express");
const { body, validationResult, param } = require("express-validator");
const router = Router();
const multer = require("multer");
const upload = multer();
const { storage, firestore } = require("../database");
const verifyToken = require("./authJwt");
const cakeTypes = ["cake", "cupcake", "bentocake"];
const config = require("config");

/**
 * Post cake into DB
 * @param {String} id - Передается в параметром в url
 * @param {String} name - Название торта
 * @param {String} description - Описание торта
 * @param {Number} price - Цена торта
 * @param {Number} weight - Вес торта
 * @param {Image} image - Логотип торта
 */
router.post(
  "/:type",
  verifyToken,
  upload.single("image"),
  // Checking parameters
  param("type", "Необходим ID объекта").exists(),
  body("name", "Имя должно быть минумум 3 символа и уникальным").isLength({
    min: 2,
  }),
  body("price", "Нужно указать цену от 0 до 1000000").isFloat({
    min: 0,
    max: 10000,
  }),
  body("description", "Должно быть описание").exists(),
  body("weight", "Должен быть указан вес").isFloat({ min: 0, max: 5 }),
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
        if (req.file) {
          const uploadFile = storage.file(
            `${Date.now()}_${req.file.originalname}`
          );
          const blobStream = uploadFile.createWriteStream({
            metadata: {
              contentType: req.file.mimeType,
            },
          });
          blobStream.on("error", (error) => {
            return res.status(500).json({
              message: error,
            });
          });
          blobStream.on("finish", async () => {
            const url = `https://firebasestorage.googleapis.com/v0/b/${storage.name}/o/${uploadFile.name}?alt=media`;
            await firestore.collection("cakes").add({
              type: type,
              name: req.body.name,
              description: req.body.description,
              price: parseFloat(req.body.price),
              weight: parseFloat(req.body.weight),
              url: url,
              isNew: false,
            });
          });
          blobStream.end(req.file.buffer);
          return res.status(201).json({
            message: "Торт загружен",
          });
        } else {
          return res.status(500).json({
            message: "При загрузке произошла ошибка! Картинки нет на месте!",
          });
        }
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
 * Get cake collection
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
          message: "Некорректные данные для торта",
        });
      }
      const type = req.params.type;
      if (cakeTypes.includes(type)) {
        const data = await firestore
          .collection("cakes")
          .where("type", "==", type)
          .get();
        const docs = data.docs.map((x) => {
          return {
            id: x.id,
            cake: x.data(),
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

function getPathStorageFromUrl(url) {
  let imagePath = url.replace(config.get("BASE_URL"), "");
  const indexOfEndPath = imagePath.indexOf("?");

  imagePath = imagePath.substring(0, indexOfEndPath);
  imagePath = imagePath.replace("%2F", "/");
  return imagePath;
}

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
      if (!doc.exists) {
        return res.status(400).json({ message: "Неверный ID" });
      }
      const noveltyDoc = await firestore.collection("carousel").doc(id).get();
      if (noveltyDoc.exists) {
        await firestore.collection("carousel").doc(id).delete();
      }
      const url = doc.data().url;
      await firestore.collection("cakes").doc(id).delete();
      await storage.file(getPathStorageFromUrl(url)).delete();
      return res.status(201).json({ message: "Торт удален!" });
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
 * @param {String} name - Название торта
 * @param {String} description - Описание торта
 * @param {Number} price - Цена торта
 * @param {Number} weight - Вес торта
 * @param {Image} image - Логотип торта
 */
router.put(
  "/:id",
  verifyToken,
  upload.single("image"),
  // Checking parameters
  param("id", "Необходим ID объекта").exists(),
  body("name", "Имя должно быть минумум 3 символа и уникальным").isLength({
    min: 3,
  }),
  body("price", "Нужно указать цену от 0 до 1000000").isFloat({
    min: 0,
    max: 1000000,
  }),
  body("description", "Должно быть описание").exists(),
  body("weight", "Должен быть указан вес").isFloat({ min: 0, max: 5 }),
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
      if (req.file) {
        const doc = await firestore.collection("cakes").doc(id).get();
        if (!doc.exists) {
          return res.status(400).json({ message: "Неверный ID" });
        }
        const url = doc.data().url;
        const uploadFile = storage.file(getPathStorageFromUrl(url));
        const blobStream = uploadFile.createWriteStream({
          metadata: {
            contentType: req.file.mimeType,
          },
        });
        blobStream.on("error", (error) => {
          return res.status(500).json({
            message: error,
          });
        });
        blobStream.on("finish", async () => {
          await firestore
            .collection("cakes")
            .doc(id)
            .update({
              name: req.body.name,
              description: req.body.description,
              price: parseFloat(req.body.price),
              weight: parseFloat(req.body.weight),
            });
          const noveltyDoc = await firestore
            .collection("carousel")
            .doc(id)
            .get();
          if (noveltyDoc.exists) {
            await firestore
              .collection("carousel")
              .doc(id)
              .update({
                name: req.body.name,
                description: req.body.description,
                price: parseFloat(req.body.price),
                weight: parseFloat(req.body.weight),
              });
          }
        });

        blobStream.end(req.file.buffer);
        return res.status(201).json({
          message: "Торт обновлен",
        });
      } else {
        return res.status(500).json({
          message: "При обновлении произошла ошибка! Проблема с картинкой!",
        });
      }
    } catch (e) {
      console.log(e);
      res.status(500).json({
        message: "При обновлении произошла ошибка!",
      });
    }
  }
);

/**
 * Update Cake
 * @param {String} id - Передается в параметром в url
 * @param {String} name - Название торта
 * @param {String} description - Описание торта
 * @param {Number} price - Цена торта
 * @param {Number} weight - Вес торта
 * @param {Image} image - Логотип торта
 */
router.put(
  "/without/:id",
  verifyToken,
  // Checking parameters
  param("id", "Необходим ID объекта").exists(),
  body("name", "Имя должно быть минумум 3 символа и уникальным").isLength({
    min: 3,
  }),
  body("price", "Нужно указать цену от 0 до 1000000").isFloat({
    min: 0,
    max: 1000000,
  }),
  body("description", "Должно быть описание").exists(),
  body("weight", "Должен быть указан вес").isFloat({ min: 0, max: 5 }),
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
      const doc = await firestore.collection("cakes").doc(id).get();
      if (!doc.exists) {
        return res.status(400).json({ message: "Неверный ID" });
      }
      await firestore
        .collection("cakes")
        .doc(id)
        .update({
          name: req.body.name,
          description: req.body.description,
          price: parseFloat(req.body.price),
          weight: parseFloat(req.body.weight),
        });
      const noveltyDoc = await firestore.collection("carousel").doc(id).get();
      if (noveltyDoc.exists) {
        await firestore
          .collection("carousel")
          .doc(id)
          .update({
            name: req.body.name,
            description: req.body.description,
            price: parseFloat(req.body.price),
            weight: parseFloat(req.body.weight),
          });
      }
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
