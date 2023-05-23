// DEPENDENCIES
const express = require("express");
const cors = require("cors");

// IMPORT ROUTES
const userController = require("./controllers/userController");
const achievementController = require("./controllers/achievementController");
const allergyController = require("./controllers/allergyController");
const medicationController = require("./controllers/medicationController");

// CONFIGURATION
const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use("/users", userController);
app.use("/users/:id/achievements", achievementController);
app.use("/users/:id/allergies", allergyController);
app.use("/users/:id/medications", medicationController);

// ROUTE HANDLERS
const homePageHandler = (req, res) => {
  res.status(200).send("Welcome to VitaTrack!");
};

const notFoundHandler = (req, res) => {
  res.status(404).send("Page not found!");
};

// ROUTES
app.get("/", homePageHandler);
app.get("*", notFoundHandler);

// EXPORT
module.exports = app;
