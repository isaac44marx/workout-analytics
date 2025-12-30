-- Database schema for workout tracking application

DROP TABLE IF EXISTS set_entries;
DROP TABLE IF EXISTS workout_sessions;
DROP TABLE IF EXISTS exercises;

-- Table to store exercises
CREATE TABLE exercises (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL CHECK (length(btrim(name)) > 0),
    category TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Unique index to ensure exercise names are unique, ignoring case and surrounding whitespace
CREATE UNIQUE INDEX exercises_name_lower_uq
ON exercises (LOWER(btrim(name)));

-- Table to store workout sessions
CREATE TABLE workout_sessions (
    id SERIAL PRIMARY KEY,
    session_date DATE NOT NULL,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Table to store individual set entries within a workout session
CREATE TABLE set_entries (
    id SERIAL PRIMARY KEY,
    session_id INT NOT NULL REFERENCES workout_sessions(id),
    exercise_id INT NOT NULL REFERENCES exercises(id),
    set_number INT,
    reps INT NOT NULL CHECK (reps > 0),
    weight NUMERIC NOT NULL CHECK (weight >= 0),
    unit TEXT NOT NULL CHECK (unit IN ('kg', 'lb')),
    rpe NUMERIC CHECK (rpe >= 1 AND rpe <= 10),
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

