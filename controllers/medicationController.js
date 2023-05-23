const express = require("express");
const medicationRouter = express.Router({ mergeParams: true });

const { getAllMedicationsByUserId, createMedication, updateMedication, deleteMedication } = require("../queries/medicationQueries");

// Helper Error Function
const handleErrors = (res, error, data) => {
  if (error?.code === 0) {
    return res.status(404).json({ error: "Medication Not Found" });
  } else if (error) {
    return res.status(500).json({ error: "Server Error" });
  }

  return res.status(200).json(data);
};

// INDEX ROUTE
medicationRouter.get("/", async (req, res) => {
  const { userId } = req.params;
  const { error, medications } = await getAllMedicationsByUserId(userId);

  return handleErrors(res, error, medications);
});

// ADD MEDICATION ROUTE
medicationRouter.post("/", async (req, res) => {
  const { userId } = req.params;
  req.body.user_id = userId;
  const { error, newMedication } = await createMedication(req.body);

  return handleErrors(res, error, newMedication);
});

// UPDATE MEDICATION ROUTE
medicationRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { error, updatedMedication } = await updateMedication(id, req.body);

  return handleErrors(res, error, updatedMedication);
});

// DELETE MEDICATION ROUTE
medicationRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const { error, deletedMedication } = await deleteMedication(id);

  return handleErrors(res, error, deletedMedication);
});

module.exports = medicationRouter;
