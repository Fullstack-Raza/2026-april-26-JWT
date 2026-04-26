const express = require("express");

const usermodel = require("../models/user.model");
const authRouter = express.Router();


authRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const isuserexsist = await usermodel.findOne({email})
  if(isuserexsist){
return res.status(400).json({
    message:"alredy exsists"
})
  }

  const user = await usermodel.create({
    name,
    email,
    password,
  });
  res.status(201).json({
    massage: "user registered",
    user,
  });
});

module.exports = authRouter;
