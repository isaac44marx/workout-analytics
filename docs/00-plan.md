Workout Analytics and Progression Tracker
Goal

Build a server-rendered web app to log workouts and generate analytics and progression insights, with a strong emphasis on relational modeling and SQL query skill.

Tech stack

Backend: Node.js + Express

Views: Server-rendered templates (EJS)

Database: PostgreSQL

SQL access: parameterized queries (no ORM at first)

Styling: minimal CSS or a simple CSS framework

App shape

The server:

renders pages (HTML)

accepts form submissions

writes/reads workout data in Postgres

runs analytics SQL and displays results

Milestones and action steps
Milestone 1: Skeleton running locally

Action items

Create Express app and basic folder structure

Add EJS templates and a shared layout

Add a home page and a navigation bar

Add a /health route and a simple “DB connected” check

Create a .env file and load environment variables

Concepts

Request/response lifecycle

Template rendering and layouts

Environment variables and configuration

Milestone 2: Database schema and seed data

Action items

Define tables and relationships in docs/01-schema.md

Create schema via a migration or a schema.sql script

Add seed script that inserts a few exercises and one sample workout

Confirm you can query the data from Node and render it on a page

Concepts

Primary keys, foreign keys

Constraints and data integrity

One-to-many relationships

Timestamps and time zones

Milestone 3: Logging workflows

Action items

Implement pages and form flows to:

create an exercise

start a workout session

add sets to a session

view a session summary

Implement edits/deletes for sets (optional initially)

Concepts

Form handling (POST/redirect/GET pattern)

Input validation and error messages

DB transactions for multi-step writes

Milestone 4: Analytics pages (SQL depth)

Action items

Implement 6–8 analytics pages driven by SQL

Add a dedicated Analytics index page linking to each report

Document each report’s definition and expected output in docs/02-queries.md

Add indexes that support the most-used reports

Concepts

Aggregations and grouping

CTEs (WITH)

Window functions for ranking and rolling metrics

Time bucketing by week/month

Milestone 5: Progression and insights

Action items

Implement a progression suggestion feature:

per exercise, show “next target” based on recent performance

Show suggestions on an Insights page

Store suggestions (optional) or compute on demand

Concepts

Heuristic logic vs stored state

Separating query logic from business rules

Explainable outputs (show the inputs used)

Milestone 6: Quality and presentation

Action items

Add a small set of meaningful tests (at least for progression logic)

Add a polished README with:

feature list

screenshots

local run instructions

highlights of interesting SQL reports

Clean up UI navigation and validation messages

Concepts

Basic testing strategy

Error handling patterns

Maintainable structure and naming

3–4 week schedule

Week 1

Milestone 1 and Milestone 2

Begin Milestone 3 (basic logging)

Week 2

Finish Milestone 3

Begin Milestone 4 analytics

Week 3

Finish Milestone 4

Milestone 5 progression and insights

Week 4

Milestone 6 quality/presentation

Optional deploy if time

Folder structure target

src/app.js server entry

src/routes/ route files by feature area

src/db/ DB pool + query helpers

src/services/ business logic (progression, validation)

src/views/ EJS templates

public/ CSS and static files

docs/ design notes and query definitions