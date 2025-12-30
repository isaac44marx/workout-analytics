# Database schema draft

## exercises

**Purpose:** Canonical list of exercises.

| Column | Type | Null | Key | Default | Notes |
|---|---|---|---|---|---|
| id | bigint | not null | PK | generated | |
| name | text | not null | UQ |  | unique exercise name |
| category | text | null |  |  | push/pull/legs |
| created_at | timestamptz | not null |  | now() | |

**Constraints**
- name must be non-empty
- unique lower(name) (case-insensitive)

**Indexes**
- (optional later) index on lower(name)

---

## workout_sessions

**Purpose:** One workout event (a day at the gym). Acts as the grouping unit for sets and many analytics.

| Column | Type | Null | Key | Default | Notes |
|---|---|---|---|---|---|
| id | bigint | not null | PK | generated | |
| session_date | date | not null | | | calendar date of workout |
| notes | text | null | | | optional session notes |
| created_at | timestamptz | not null | | now() | |

**Constraints**
- session_date must be present

**Indexes**
- (optional later) index on session_date

---

## set_entries

**Purpose:** Each logged set, attached to a session and an exercise. This is the core “fact table” for analytics.

| Column | Type | Null | Key | Default | Notes |
|---|---|---|---|---|---|
| id | bigint | not null | PK | generated | |
| session_id | bigint | not null | FK | | references workout_sessions.id |
| exercise_id | bigint | not null | FK | | references exercises.id |
| set_number | int | null | | | |
| reps | int | not null | | | |
| weight | numeric | not null | | | |
| unit | text | not null | | | 'lb' or 'kg' |
| rpe | numeric | null | | | |
| notes | text | null | | | |
| created_at | timestamptz | not null | | now() | |

**Constraints**
- reps > 0
- weight >= 0
- unit in ('lb', 'kg')
- foreign keys enforced

**Indexes**
- index on session_id
- index on exercise_id
- (optional later) composite index on (exercise_id, session_id)

---

Database schema draft
Design principles

Normalize core entities (avoid duplicating exercise names in sets)

Use foreign keys + constraints to keep data clean

Store raw set data; compute analytics from queries

Tables
exercises

Purpose: canonical list of exercises.

Fields

id (PK)

name (text, unique, required)

category (text, optional) e.g., push/pull/legs

created_at (timestamp)

Constraints

unique name (case-insensitive if you want)

name non-empty

workout_sessions

Purpose: one workout event (a day at the gym).

Fields

id (PK)

session_date (date, required)

notes (text, optional)

created_at (timestamp)

Notes

Session date is the “grouping unit” for many analytics.

Use date rather than timestamp for simplicity; can add start_time later.

set_entries

Purpose: each logged set, attached to a session and an exercise.

Fields

id (PK)

session_id (FK → workout_sessions.id, required)

exercise_id (FK → exercises.id, required)

set_number (int, optional but useful for ordering)

reps (int, required)

weight (numeric/decimal, required)

unit (text, required) e.g., 'lb' or 'kg'

rpe (numeric, optional)

notes (text, optional)

created_at (timestamp)

Constraints

reps > 0

weight >= 0

unit in ('lb','kg')

foreign keys enforced

Indexing plan (add after analytics exists)

Start with:

index on set_entries(session_id)

index on set_entries(exercise_id)

composite index on (exercise_id, session_id) if your analytics join those often

index on workout_sessions(session_date) for time filtering

Add/adjust after you write the analytics queries.

Future expansions (only if time)

programs and program_weeks

exercise_variants or “alias” handling

bodyweight logs

“estimated 1RM” table (but you can compute on the fly initially)