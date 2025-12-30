// src/app.js
// This is the main entry point for the application.
// Its job is wiring: configuration + connecting pieces together.

const path = require("path");
const express = require("express");
require("dotenv").config();
const expressLayouts = require("express-ejs-layouts");



// Import route definitions
const pageRoutes = require("./routes/pages");

const app = express();
const PORT = 3000;

/*
  VIEW ENGINE SETUP
  -----------------
  Tell Express:
  - where view templates live
  - which template engine to use
*/
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

/*
  LAYOUT SETUP
  ------------
  Enable layouts and tell Express which layout file to use
*/
app.use(expressLayouts);
app.set("layout", "partials/layout");

/*
  STATIC FILES
  ------------
  Serve files from /public at the root URL.
  Example:
    public/styles.css → http://localhost:3000/styles.css
*/
app.use(express.static(path.join(__dirname, "..", "public")));

/*
  MIDDLEWARE
  ----------
  Parse URL-encoded request bodies (form submissions)
*/
app.use(express.urlencoded({ extended: false }));

/*
  ROUTES
  ------
  Hand off request handling to the routes module.
  This means:
    "/" and "/analytics" are defined elsewhere.
*/
app.use("/", pageRoutes);

/*
  START SERVER
  ------------
  Begin listening for incoming HTTP requests
*/
app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});

