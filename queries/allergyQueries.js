const db = require("../db/dbConfig.js");

const getAllAllergies = async () => {
  try {
    const allergies = await db.any("SELECT * FROM allergies");
    return { allergies };
  } catch (error) {
    throw error;
  }
};

const getAllergyById = async (id) => {
  try {
    const allergy = await db.one("SELECT * FROM allergies WHERE id = $1", id);
    return { allergy };
  } catch (error) {
    throw error;
  }
};

const createAllergy = async (allergy) => {
  try {
    const newAllergy = await db.one("INSERT INTO allergies (name, user_id) VALUES ($1, $2) RETURNING *", [allergy.name, allergy.user_id]);
    return { newAllergy };
  } catch (error) {
    throw error;
  }
};

const updateAllergy = async (id, allergy) => {
  try {
    const updatedAllergy = await db.one("UPDATE allergies SET name = $1, user_id = $2 WHERE id = $3 RETURNING *", [allergy.name, allergy.user_id, id]);
    return { updatedAllergy };
  } catch (error) {
    throw error;
  }
};

const deleteAllergy = async (id) => {
  try {
    const deletedAllergy = await db.one("DELETE FROM allergies WHERE id = $1 RETURNING *", id);
    return { deletedAllergy };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllAllergies,
  getAllergyById,
  createAllergy,
  updateAllergy,
  deleteAllergy,
};
