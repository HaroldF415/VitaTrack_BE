const express = require("express");
const achievementsRouter = express.Router();

const { getAllAchievements, getAchievementById, createAchievement, updateAchievement, deleteAchievement } = require("../queries/achievementsQueries.js");

const handleErrors = (res, error, data) => {
  if (error) {
    return res.status(500).json({ error: "Server Error" });
  }

  return res.status(200).json(data);
};

// INDEX ROUTE
achievementsRouter.get("/achievements", async (req, res) => {
  const { error, achievements } = await getAllAchievements();

  return handleErrors(res, error, achievements);
});

// SHOW ACHIEVEMENT ROUTE - by id
achievementsRouter.get("/achievements/:id", async (req, res) => {
  const { id } = req.params;
  const { error, achievement } = await getAchievementById(id);

  return handleErrors(res, error, achievement);
});

// ADD ACHIEVEMENT ROUTE
achievementsRouter.post("/achievements", async (req, res) => {
  const { error, newAchievement } = await createAchievement(req.body);

  return handleErrors(res, error, newAchievement);
});

// UPDATE ACHIEVEMENT ROUTE
achievementsRouter.put("/achievements/:id", async (req, res) => {
  const { id } = req.params;
  const { error, updatedAchievement } = await updateAchievement(id, req.body);

  return handleErrors(res, error, updatedAchievement);
});

// DELETE ACHIEVEMENT ROUTE
achievementsRouter.delete("/achievements/:id", async (req, res) => {
  const { id } = req.params;
  const { error, deletedAchievement } = await deleteAchievement(id);

  return handleErrors(res, error, deletedAchievement);
});

module.exports = achievementsRouter;
