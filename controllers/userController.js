const express = require("express");
const userRouter = express.Router();

// MIDDLEWARE
const validateUser = require("../validations/createUserValidator.js");

const { getAllUsers, getUserById, createUser, updateUser, deleteUser } = require("../queries/userQueries.js");

// Helper Error Function
const handleErrors = (res, error, data) => {
  if (error?.code === 0) {
    return res.status(404).json({ error: "User Not Found" });
  } else if (error) {
    return res.status(500).json({ error: "Server Error" });
  }

  return res.status(200).json(data);
};

// INDEX ROUTE
userRouter.get("/users", async (req, res) => {
  const { error, users } = await getAllUsers();
  console.log(users);
  return handleErrors(res, error, users);
});

// SHOW USER ROUTE - by id
userRouter.get("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { error, user } = await getUserById(id);

  return handleErrors(res, error, user);
});

// ADD USER ROUTE
userRouter.post("/users", validateUser, async (req, res) => {
  const { error, newUser } = await createUser(req.body);

  return handleErrors(res, error, newUser);
});

// UPDATE USER ROUTE
userRouter.put("/users/:id", validateUser, async (req, res) => {
  const { id } = req.params;
  const { error, updatedUser } = await updateUser(id, req.body);

  return handleErrors(res, error, updatedUser);
});

// DELETE USER ROUTE
userRouter.delete("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { error, deletedUser } = await deleteUser(id);

  return handleErrors(res, error, deletedUser);
});

module.exports = userRouter;
