const express = require("express");
const usermodel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const authRouter = express.Router();

authRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const isuserexsist = await usermodel.findOne({ email });
  if (isuserexsist) {
    return res.status(400).json({
      message: "alredy exsists",
    });
  }

  const user = await usermodel.create({
    name,
    email,
    password,
  });
  const token = jwt.sign(
    {
      id: user._id,
      email:user.email
    },
    process.env.JWT_secrets,
  );

  res.cookie("JWt_token",token)
  res.status(201).json({
    massage: "user registered",
    user,
    token,
  });
});

module.exports = authRouter;
