const express = require("express");
const achievementRouter = express.Router({ mergeParams: true });

const { getAllAchievementsByUser, getAchievementById, createAchievement, updateAchievement, deleteAchievement } = require("../queries/achievementsQueries.js");

const handleErrors = (res, error, data) => {
  if (error) {
    return res.status(500).json({ error: "Server Error" });
  }
  return res.status(200).json(data);
};

// GET all achievements of a user
achievementRouter.get("/", async (req, res) => {
  const userId = req.params.id;
  const { error, achievements } = await getAllAchievementsByUser(userId);

  return handleErrors(res, error, achievements);
});

// POST new achievement for a user
achievementRouter.post("/", async (req, res) => {
  const userId = req.params.id;
  const { error, newAchievement } = await createAchievement(req.body, userId);

  return handleErrors(res, error, newAchievement);
});

// DELETE achievement of a user by achievement ID
achievementRouter.delete("/:achievementId", async (req, res) => {
  const achievementId = req.params.achievementId;
  const { error, deletedAchievement } = await deleteAchievement(achievementId);

  return handleErrors(res, error, deletedAchievement);
});

// UPDATE achievement of a user by achievement ID
achievementRouter.put("/:achievementId", async (req, res) => {
  const achievementId = req.params.achievementId;
  const { error, updatedAchievement } = await updateAchievement(achievementId, req.body);

  return handleErrors(res, error, updatedAchievement);
});

module.exports = achievementRouter;
