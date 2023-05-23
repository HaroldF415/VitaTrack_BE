const express = require("express");
const allergyRouter = express.Router();

const { getAllAllergies, getAllergyById, createAllergy, updateAllergy, deleteAllergy } = require("../queries/allergyQueries.js");

// Helper Error Function
const handleErrors = (res, error, data) => {
  if (error) {
    return res.status(500).json({ error });
  }
  return res.status(200).json(data);
};

// INDEX
allergyRouter.get("/", async (req, res) => {
  const allergies = await getAllAllergies();
  handleErrors(res, allergies.error, allergies);
});

// SHOW
allergyRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  const allergy = await getAllergyById(id);
  handleErrors(res, allergy.error, allergy);
});

// CREATE
allergyRouter.post("/", async (req, res) => {
  const newAllergy = await createAllergy(req.body);
  handleErrors(res, newAllergy.error, newAllergy);
});

// UPDATE
allergyRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updatedAllergy = await updateAllergy(id, req.body);
  handleErrors(res, updatedAllergy.error, updatedAllergy);
});

// DELETE
allergyRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deletedAllergy = await deleteAllergy(id);
  handleErrors(res, deletedAllergy.error, deletedAllergy);
});

module.exports = allergyRouter;
