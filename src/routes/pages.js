// src/routes/pages.js
// This file defines routes related to rendering pages (views)

const { query } = require("../db/query");

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

/*
  GET /exercises
*/
router.get("/exercises", async (req, res) => {
  try {  
    const result = await query("SELECT * FROM exercises ORDER BY name ASC");
    res.render("exercises", {
      title: "Workout Analytics – Exercises",
      exercises: result.rows
    });
  } catch (err) {
    console.error("EXERCISES PAGE ERROR:", err);
    res.status(500).send("Internal Server Error");
  }  
});

/*
  POST /exercises
*/
router.post("/exercises", async (req, res) => {
  try {
    const { name, category } = req.body;

    await query(
      "INSERT INTO exercises (name, category) VALUES ($1, $2)",
      [name.trim(), category || null]
    );

    res.redirect("/exercises");
  } catch (err) {
    console.error("CREATE EXERCISE ERROR:", err);
    res.status(500).send("Error creating exercise");
  }
});

/*
  GET /sessions
*/
router.get("/sessions", async (req, res) => { 
  try {
    const result = await query("SELECT * FROM workout_sessions ORDER BY session_date DESC");
    res.render("sessions", {
      title: "Workout Analytics – Sessions",
      sessions: result.rows
    });
  } catch (err) {
    console.error("SESSIONS PAGE ERROR:", err);
    res.status(500).send("Internal Server Error");
  }
});

/*
  POST /sessions
*/
router.post("/sessions", async (req, res) => {
  try {
    const { session_date, notes } = req.body;

    await query(
      "INSERT INTO workout_sessions (session_date, notes) VALUES ($1, $2)",
      [session_date, notes || null]
    );

    res.redirect("/sessions");
  } catch (err) {
    console.error("CREATE SESSION ERROR:", err);
    res.status(500).send("Error creating session");
  }
});

/*
  GET /sessions/:id
*/
router.get("/sessions/:id", async (req, res) => {
  try {
    const sessionId = req.params.id;

    const sessionResult = await query(
      "SELECT * FROM workout_sessions WHERE id = $1",
      [sessionId]
    );

    if (sessionResult.rows.length === 0) {
      return res.status(404).send("Session not found");
    }

    const session = sessionResult.rows[0];

    const setsResult = await query(
      `
      SELECT
        se.*,
        e.name AS exercise_name,
        e.category AS exercise_category
      FROM set_entries se
      JOIN exercises e
        ON se.exercise_id = e.id
      WHERE se.session_id = $1
      ORDER BY se.set_number ASC NULLS LAST, se.created_at ASC
      `,
      [sessionId]
    );

    res.render("session", {
      title: `Workout Session - ${session.session_date}`,
      session,
      sets: setsResult.rows
    });
  } catch (err) {
    console.error("SESSION DETAIL ERROR:", err);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/debug/db", async (req, res) => {
  try {
    const result = await query("SELECT NOW() as now");
    res.json({ ok: true, now: result.rows[0].now });
  } catch (err) {
  console.error("DB DEBUG ERROR:", err);

    res.status(500).json({
      ok: false,
      name: err?.name,
      message: err?.message,
      code: err?.code,
      detail: err?.detail,
      hint: err?.hint,
      stack: err?.stack
    });
  }
});

// Export the router so app.js can "plug it in"
module.exports = router;