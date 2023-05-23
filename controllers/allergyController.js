const express = require("express");
const allergyRouter = express.Router({ mergeParams: true });

const { getAllAllergiesByUser, getAllergyById, createAllergy, updateAllergy, deleteAllergy } = require("../queries/allergyQueries.js");

const handleErrors = (res, error, data) => {
  if (error) {
    return res.status(500).json({ error: "Server Error" });
  }
  return res.status(200).json(data);
};

// GET all allergies of a user
allergyRouter.get("/", async (req, res) => {
  const userId = req.params.id;
  const { error, allergies } = await getAllAllergiesByUser(userId);

  return handleErrors(res, error, allergies);
});

// POST new allergy for a user
allergyRouter.post("/", async (req, res) => {
  const userId = req.params.id;
  const { error, newAllergy } = await createAllergy(req.body, userId);

  return handleErrors(res, error, newAllergy);
});

// DELETE allergy of a user by allergy ID
allergyRouter.delete("/:allergyId", async (req, res) => {
  const allergyId = req.params.allergyId;
  const { error, deletedAllergy } = await deleteAllergy(allergyId);

  return handleErrors(res, error, deletedAllergy);
});

// UPDATE allergy of a user by allergy ID
allergyRouter.put("/:allergyId", async (req, res) => {
  const allergyId = req.params.allergyId;
  const { error, updatedAllergy } = await updateAllergy(allergyId, req.body);

  return handleErrors(res, error, updatedAllergy);
});

module.exports = allergyRouter;
