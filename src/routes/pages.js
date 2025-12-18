// src/routes/pages.js
// This file defines routes related to rendering pages (views)

const express = require("express");

// Create a router object.
// A router is like a mini Express app that only handles routes.
const router = express.Router();

/*
  GET /
  Home page route
*/
router.get("/", (req, res) => {
  res.render("home", {
    title: "Workout Analytics"
  });
});

/*
  GET /analytics
  Analytics page route
*/
router.get("/analytics", (req, res) => {
  res.render("analytics", {
    title: "Workout Analytics – Analytics"
  });
});

// Export the router so app.js can "plug it in"
module.exports = router;