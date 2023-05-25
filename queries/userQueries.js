const db = require("../db/dbConfig.js");

async function getUserById(id) {
  try {
    const user = await db.one("SELECT * FROM users WHERE id = $1", id);
    const achievements = await db.manyOrNone("SELECT * FROM achievements WHERE user_id = $1", id);
    const allergies = await db.manyOrNone("SELECT * FROM allergies WHERE user_id = $1", id);
    const medications = await db.manyOrNone("SELECT * FROM medications WHERE user_id = $1", id);

    user.achievements = achievements;
    user.allergies = allergies;
    user.medications = medications;

    return { error: null, user };
  } catch (error) {
    return { error, user: null };
  }
}

async function getAllUsers() {
  try {
    const users = await db.manyOrNone("SELECT * FROM users");
    return { error: null, users };
  } catch (error) {
    return { error, users: null };
  }
}

module.exports = {
  getUserById,
  getAllUsers,
};
