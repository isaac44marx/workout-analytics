You’ll paste real snippets here as you encounter them.

---

## How to use it effectively (important)
- Add snippets **when you learn them**, not ahead of time
- Keep explanations short
- This file is allowed to be ugly
- Search it often instead of Googling repeatedly

It becomes *your* reference, not generic docs.

---

## One small but helpful habit
When you solve something tricky:
1. Paste the working snippet into `99-reference.md`
2. Add **one line** explaining when to use it

That’s how you actually retain syntax.

---

## Project Concepts
A web app has two essential pieces:

A server

a program that listens for HTTP requests

responds with HTML, JSON, etc.

A client (browser)

sends HTTP requests

renders the responses

“Web app” does not automatically mean “on the internet.”

app.js

decides which page to show

decides what data to pass

home.ejs, analytics.ejs

decide what content goes on the page

layout.ejs

decides what is shared across all pages:

nav

outer HTML

CSS link

header/footer later

What is “wiring”?

Wiring is the code that configures Express, connects middleware, mounts routes, and starts the server — but does not decide page content or behavior.

What does app.js do?

It does not describe pages.
It describes how the app is assembled.

What do route files do?

They define what pages exist and what views they render.

.js

✔️ JavaScript code

Runs on the server (Node.js)

Controls logic, routing, data flow

Decides what happens when a request comes in

Examples in your project:

app.js → server wiring

routes/pages.js → routing logic

Think of .js files as:

“The brain of the application”

.ejs

Mostly correct, but here’s the precise version:

✔️ HTML template with embedded JavaScript

Produces HTML

Can contain dynamic values (<%= title %>)

Used to generate pages on the server

Important distinction:

.ejs is not pure HTML

It’s HTML plus small bits of JS for templating

Think of .ejs files as:

“HTML with placeholders that the server fills in”

.css

✔️ Styling instructions

Tells the browser how things should look

Colors, spacing, fonts, layout

Does not control behavior

Think of .css as:

“Presentation rules”

## app.js

src/app.js

This is the entry point. When you run:

node src/app.js


Node executes app.js top-to-bottom.

Here’s what each piece means (based on the version we just set up with layouts):

const path = require("path");
const express = require("express");
const expressLayouts = require("express-ejs-layouts");


require(...) loads modules.

path helps build file paths safely on Windows/Mac.

express is the web server framework.

express-ejs-layouts is the add-on that gives you clean layouts.

const app = express();
const PORT = 3000;


app is your server object.

PORT is the “door” your server listens on (localhost:3000).

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");


views tells Express where to find templates.

__dirname is the folder that app.js lives in (src/)

so this becomes src/views

view engine says: when I call res.render("home"), use EJS to turn it into HTML.

app.use(expressLayouts);
app.set("layout", "partials/layout");


app.use(...) registers middleware (code that runs during request handling).

This middleware makes layouts work automatically.

layout says: wrap every rendered view with src/views/partials/layout.ejs.

app.get("/", (req, res) => {
  res.render("home", { title: "Workout Analytics" });
});


app.get("/", ...) registers a route handler for GET requests to /.

req = request (incoming info)

res = response (what you send back)

res.render("home", ...) means:

load src/views/home.ejs

inject the variables (like title)

wrap it inside the layout

send the final HTML to the browser

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});


Starts the server listening.

Without this, nothing runs.