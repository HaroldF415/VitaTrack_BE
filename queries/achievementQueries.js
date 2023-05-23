const db = require("../db/dbConfig.js");

const getAllAchievements = async () => {
  try {
    const achievements = await db.any("SELECT * FROM achievements");
    return { achievements };
  } catch (error) {
    throw error;
  }
};

const getAchievementById = async (id) => {
  try {
    const achievement = await db.one("SELECT * FROM achievements WHERE id = $1", id);
    return { achievement };
  } catch (error) {
    throw error;
  }
};

const createAchievement = async (achievement) => {
  try {
    const newAchievement = await db.one("INSERT INTO achievements (title, description, user_id) VALUES ($1, $2, $3) RETURNING *", [achievement.title, achievement.description, achievement.user_id]);
    return { newAchievement };
  } catch (error) {
    throw error;
  }
};

const updateAchievement = async (id, achievement) => {
  try {
    const updatedAchievement = await db.one("UPDATE achievements SET title = $1, description = $2, user_id = $3 WHERE id = $4 RETURNING *", [achievement.title, achievement.description, achievement.user_id, id]);
    return { updatedAchievement };
  } catch (error) {
    throw error;
  }
};

const deleteAchievement = async (id) => {
  try {
    const deletedAchievement = await db.one("DELETE FROM achievements WHERE id = $1 RETURNING *", id);
    return { deletedAchievement };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllAchievements,
  getAchievementById,
  createAchievement,
  updateAchievement,
  deleteAchievement,
};
