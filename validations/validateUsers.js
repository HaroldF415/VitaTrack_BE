const Joi = require("joi");
const createValidator = require("./createValidator.js");

// SCHEMA
const userSchema = Joi.object({
  userName: Joi.string().alphanum().min(3).max(30).required(),
  firstName: Joi.string().alphanum().min(3).max(30).required(),
  lastName: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
  dob: Joi.date().less("now").required(),
  weight: Joi.number().positive().precision(2).required(),
  height: Joi.number().positive().precision(2).required(),
  activityLevel: Joi.string().valid("sedentary", "moderate", "active").required(),
  goal: Joi.string().valid("lose", "maintain", "gain").required(),
  bloodSugarLevel: Joi.array().items(Joi.number().positive()).required(),
  privacySetting: Joi.boolean().required(),
  achievements: Joi.array().items(Joi.string()).required(),
  lastCheckIn: Joi.date().less("now").required(),
  dietaryPreferences: Joi.string().valid("vegetarian", "vegan", "pescatarian", "keto", "paleo", "gluten-free", "dairy-free", "nut-free", "none").required(),
  allergies: Joi.array().items(Joi.string()).required(),
  medications: Joi.array().items(Joi.string()).required(),
  medicationReminder: Joi.boolean().required(),
});

module.exports = userSchema;
