var pool = require("../config/database");

module.exports = {
  preferences: async (id, name, preferences) => {
    console.log(id);
    console.log(preferences);

    // Select existing preferences
    const sql = "SELECT * FROM user_preferences WHERE userid=? AND username=?";
    const result = await pool.query(sql, [id, name]);

    // Convert arrays to JSON strings or handle null cases
    const goals = preferences.goals.length
      ? JSON.stringify(preferences.goals)
      : null;
    const type = preferences.type.length
      ? JSON.stringify(preferences.type)
      : null;
    const language = preferences.language.length
      ? JSON.stringify(preferences.language)
      : null;

    // Convert zodiac, children, workout, sleep, and gender to JSON (includes both value and label)
    const zodiac = preferences.zodiac
      ? JSON.stringify([
          { value: preferences.zodiac.value, label: preferences.zodiac.label },
        ])
      : null;
    const children = preferences.children
      ? JSON.stringify([
          {
            value: preferences.children.value,
            label: preferences.children.label,
          },
        ])
      : null;
    const workout = preferences.workout
      ? JSON.stringify([
          {
            value: preferences.workout.value,
            label: preferences.workout.label,
          },
        ])
      : null;
    const sleep = preferences.sleep
      ? JSON.stringify([
          { value: preferences.sleep.value, label: preferences.sleep.label },
        ])
      : null;
    const gender = preferences.gender
      ? JSON.stringify([
          { value: preferences.gender.value, label: preferences.gender.label },
        ])
      : null;

    // Convert other fields to JSON or handle null cases
    const education = preferences.education
      ? JSON.stringify([
          {
            value: preferences.education.value,
            label: preferences.education.label,
          },
        ])
      : null;
    const personality = preferences.personality.length
      ? JSON.stringify(preferences.personality)
      : null;
    const communication = preferences.communication.length
      ? JSON.stringify(preferences.communication)
      : null;
    const love = preferences.love.length
      ? JSON.stringify(preferences.love)
      : null;
    const pets = preferences.pets.length
      ? JSON.stringify(preferences.pets)
      : null;
    const drink = preferences.drink.length
      ? JSON.stringify(preferences.drink)
      : null;
    const smoke = preferences.smoke.length
      ? JSON.stringify(preferences.smoke)
      : null;
    const dietary = preferences.dietary.length
      ? JSON.stringify(preferences.dietary)
      : null;
    const socialMedia = preferences.socialMedia.length
      ? JSON.stringify(preferences.socialMedia)
      : null;

    if (result.length > 0) {
      // Record exists, update it
      const sql2 = `UPDATE user_preferences SET 
        relationship_goals = ?,
        relationship_type = ?,
        language = ?,
        zodiac = ?,
        education = ?,
        children = ?,
        personality = ?,
        communication = ?,
        love = ?,
        pets = ?,
        drink = ?,
        smoke = ?,
        workout = ?,
        dietary = ?,
        socialMedia = ?,
        sleep = ?,
        gender = ?
        WHERE userid = ? AND username = ?`;

      return await pool.query(sql2, [
        goals,
        type,
        language,
        zodiac, // Zodiac as JSON [{value: '', label: ''}]
        education, // Education as JSON [{value: '', label: ''}]
        children, // Children as JSON [{value: '', label: ''}]
        personality,
        communication,
        love,
        pets,
        drink,
        smoke,
        workout, // Workout as JSON [{value: '', label: ''}]
        dietary,
        socialMedia,
        sleep, // Sleep as JSON [{value: '', label: ''}]
        gender, // Gender as JSON [{value: '', label: ''}]
        id,
        name,
      ]);
    } else {
      // Record does not exist, insert it
      const sql3 = `
      INSERT INTO user_preferences 
      (userid, username, relationship_goals, relationship_type, language, zodiac, education, children, personality, communication, love, pets, drink, smoke, workout, dietary, socialMedia, sleep, gender)
      VALUES 
      (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

      return await pool.query(sql3, [
        id,
        name,
        goals,
        type,
        language,
        zodiac, // Zodiac as JSON [{value: '', label: ''}]
        education, // Education as JSON [{value: '', label: ''}]
        children, // Children as JSON [{value: '', label: ''}]
        personality,
        communication,
        love,
        pets,
        drink,
        smoke,
        workout, // Workout as JSON [{value: '', label: ''}]
        dietary,
        socialMedia,
        sleep, // Sleep as JSON [{value: '', label: ''}]
        gender, // Gender as JSON [{value: '', label: ''}]
      ]);
    }
  },

  getuserpreferences: async (id) => {
    const sql = "SELECT * FROM user_preferences WHERE userid = ? ";

    var result = await pool.query(sql, [id]);
    return result;
  },
};
