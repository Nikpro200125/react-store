const { Router } = require("express");
const { body, validationResult } = require("express-validator");
const axios = require("axios");
const router = Router();
const config = require("config");
const users = ["477480929", "447967060"];

/**
 * Отправка заказа в телеграм
 * @param {String} text - Текст сообщения
 */
router.post(
  "/order",
  body("text", "text должен быть").exists(),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Некорректные данные для заказа",
        });
      }
      users.forEach((value) => {
        axios.post(config.get("BOT_LINK"), {
          chat_id: value,
          text: req.body.text,
        });
      });
      return res.status(200).json({ message: "Заказ отправлен!" });
    } catch (e) {
      res.status(500).json({
        message: "При загрузке произошла ошибка!",
      });
    }
  }
);

module.exports = router;
