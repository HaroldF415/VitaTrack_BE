const db = require("../db/dbConfig.js");

const getAllMedications = async () => {
  try {
    const medications = await db.any("SELECT * FROM medications");
    return { medications };
  } catch (error) {
    throw error;
  }
};

const getMedicationById = async (id) => {
  try {
    const medication = await db.one("SELECT * FROM medications WHERE id = $1", id);
    return { medication };
  } catch (error) {
    throw error;
  }
};

const createMedication = async (medication) => {
  try {
    const newMedication = await db.one("INSERT INTO medications (name, dosage, user_id) VALUES ($1, $2, $3) RETURNING *", [medication.name, medication.dosage, medication.user_id]);
    return { newMedication };
  } catch (error) {
    throw error;
  }
};

const updateMedication = async (id, medication) => {
  try {
    const updatedMedication = await db.one("UPDATE medications SET name = $1, dosage = $2, user_id = $3 WHERE id = $4 RETURNING *", [medication.name, medication.dosage, medication.user_id, id]);
    return { updatedMedication };
  } catch (error) {
    throw error;
  }
};

const deleteMedication = async (id) => {
  try {
    const deletedMedication = await db.one("DELETE FROM medications WHERE id = $1 RETURNING *", id);
    return { deletedMedication };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllMedications,
  getMedicationById,
  createMedication,
  updateMedication,
  deleteMedication,
};
