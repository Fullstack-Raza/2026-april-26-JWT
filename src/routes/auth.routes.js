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
      email: user.email,
    },
    process.env.JWT_secrets,
  );

  res.cookie("JWt_token", token);
  res.status(201).json({
    massage: "user registered",
    user,
    token,
  });
});

authRouter.post("/protected", (req, res) => {
  console.log(req.cookies);
  res.status(200).json({
    massage: "right",
  });
});

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await usermodel.findOne({ email });
  if (!user) {
    return res.status(404).json({
      message: "user not found!",
    });
  }
  const isPasswordMatched = user.password === password;
  if (!isPasswordMatched) {
    return res.status(401).json({
      message: "invalid password",
    });
  }
  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_secrets,
  );
  res.cookie("JWt_token", token);
  res.status(200).json({
    message: "user loged in",
    user,
  });
});
module.exports = authRouter;
