const { Router } = require("express");
const router = Router();
const bc = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const config = require("config");
const { firestore } = require("../database");

/**
 * Обработчик запросов на авторизацию
 */
router.post(
  "/login",
  // Checking parameters
  body("login", "Минимальная длина логина 5 символов").isLength({
    min: 5,
    max: 32,
  }),
  body("password", "Пароль не должен быть пустым").isLength({
    min: 5,
    max: 32,
  }),
  async (req, res) => {
    try {
      // Validating parameters
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Некорректные данные авторизации",
        });
      }

      // Getting login and password from request
      const { login, password } = req.body;

      const userDoc = await firestore.collection("users").doc(login).get();

      if (userDoc.exists) {
        const isMatch = await bc.compare(password, userDoc.data().password);
        if (isMatch) {
          const token = jwt.sign(
            {
              userId: userDoc.id,
            },
            config.get("SECRET"),
            {
              expiresIn: 60 * 60 * 24,
            }
          );
          return res
            .cookie("accessToken", token, {
              maxAge: 1000 * 60 * 60 * 24,
            })
            .status(200)
            .json({
              message: "Успешно вошли!",
            });
        } else {
          return res.status(400).json({
            message: "Неверные данные, попробуйте снова",
          });
        }
      } else {
        return res.status(400).json({
          message: "Пользователь не найден",
        });
      }

      // Catching errors
    } catch (e) {
      return res.status(500).json({
        message: "При авторизации произошла ошибка!",
      });
    }
  }
);

/**
 * Обработчик запросов на регистрацию
 */
router.post(
  "/registration",
  // Checking parameters
  body("login", "Минимальная длина логина 5 символов").isLength({
    min: 5,
    max: 32,
  }),
  body("password", "Минимальная длина пароля 5 символов").isLength({
    min: 5,
    max: 32,
  }),
  async (req, res) => {
    try {
      // Validating parameters
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Некоректные данные регистрации",
        });
      }

      // Getting login and password from request
      const { login, password } = req.body;
      // Checking DB on user credential
      const userDoc = await firestore.collection("users").doc(login).get();

      // If candidate is existing
      if (userDoc.exists) {
        return res.status(400).json({
          message: "Такой пользователь уже существует",
        });
      }

      // Hashing password
      const hashedPassword = await bc.hash(password, 13);
      const user = {
        login: login,
        password: hashedPassword,
      };
      console.log(user);
      // Save new user
      await firestore.collection("users").doc(login).set(user);

      // Return 201 status
      return res.status(201).json({
        message: "Пользователь создан",
      });
      // Catching errors
    } catch (e) {
      return res.status(500).json({
        message: "При регистрации произошла ошибка!",
      });
    }
  }
);

router.post("/logout", (req, res) => {
  return res.clearCookie("accessToken").status(200).json({
    message: "Вы успешно вышли!",
  });
});

module.exports = router;
