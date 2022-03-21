const express = require("express");
const path = require("path");
const config = require("config");
const cookieParser = require("cookie-parser");
const tokenExpiredCheck = require("./services/tokenExpiredCheck");

// application
const app = express();

// Parse json
app.use(express.json());

// cookie
app.use(cookieParser());

// check cookie
app.use(tokenExpiredCheck);

// eslint-disable-next-line no-undef
app.use(express.static(path.resolve(__dirname, "../client/build")));

// eslint-disable-next-line no-undef
app.use("/images", express.static(path.resolve(__dirname, "./images")));

// Route auth api
app.use("/api/auth", require("./api/auth"));

// Some api
app.use("/api/carousel", require("./api/carousel"));

// Route order api
app.use("/api", require("./api/order"));

// Route cupcakes api
app.use("/api/cupcakes", require("./api/cupcakes"));

// Route DB cakes api SHOULD BE LAST
app.use("/api/cakes", require("./api/cakes"));

app.get("*", (req, res) => {
  // eslint-disable-next-line no-undef
  res.sendFile(path.resolve(__dirname, "../client/build/index.html"));
});

app.listen(config.get("PORT"), () => {
  console.log(`Server listening on ${config.get("PORT")} port`);
});
