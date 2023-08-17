// const dotenv = require("dotenv");

// dotenv.config({ path: "config.env" });

const jwt = require("jsonwebtoken");

const createToken = (payload) =>
  jwt.sign({ userId: payload }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.EXPIRE_TIME,
  });

module.exports = createToken;
