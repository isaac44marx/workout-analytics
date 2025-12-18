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