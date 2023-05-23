async function getUserById(id) {
  try {
    const user = await db.one("SELECT * FROM users WHERE id = $1", id);
    const achievements = await db.many("SELECT * FROM achievements WHERE user_id = $1", id);
    const allergies = await db.many("SELECT * FROM allergies WHERE user_id = $1", id);
    const medications = await db.many("SELECT * FROM medications WHERE user_id = $1", id);

    user.achievements = achievements;
    user.allergies = allergies;
    user.medications = medications;

    return { error: null, user };
  } catch (error) {
    return { error, user: null };
  }
}
