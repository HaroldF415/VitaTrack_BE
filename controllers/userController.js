const express = require("express");
const userRouter = express.Router();

// MIDDLEWARE
const validateUser = require("../validations/userValidations.js");

const { getAllUsers, getUserById, createUser, updateUser, deleteUser } = require("../queries/userQueries.js");

// INDEX ROUTE
userRouter.get("/", async (req, res) => {
  const users = await getAllUsers();

  if (!users[0]) {
    return res.status(500).json({ error: "Server Error" });
  }

  res.status(200).json(users);
});
