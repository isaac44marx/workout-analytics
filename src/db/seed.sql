-- Seed data for exercises, workout sessions, and set entries

INSERT INTO exercises (name, category) VALUES
('Squat', 'Strength'),
('Bench Press', 'Strength'),
('Deadlift', 'Strength'),
('Overhead Press', 'Strength'),
('Barbell Row', 'Strength'),
('Pull-Up', 'Bodyweight'),
('Push-Up', 'Bodyweight'),
('Plank', 'Core'),
('Lunges', 'Strength'),
('Bicep Curl', 'Isolation');

INSERT INTO workout_sessions (session_date, notes) VALUES
('2024-06-01', 'Leg day workout focusing on squats and lunges.'),
('2024-06-03', 'Upper body strength training with bench press and pull-ups.'),
('2024-06-05', 'Full body workout including deadlifts and overhead press.');

INSERT INTO set_entries (session_id, exercise_id, set_number, reps, weight, unit, rpe, notes) VALUES
(1, 1, 1, 5, 100, 'kg', 8, 'Felt strong on the first set.'),
(1, 1, 2, 5, 105, 'kg', 8.5, 'Challenging but manageable.'),
(1, 9, 1, 10, 40, 'kg', 7, 'Good form maintained.'),
(2, 2, 1, 5, 80, 'kg', 8, 'Solid performance.'),
(2, 6, 1, 8, 0, 'lb', 7.5, 'Bodyweight exercise.'),
(3, 3, 1, 5, 120, 'kg', 9, 'Heavy but completed all reps.'),
(3, 4, 1, 5, 60, 'kg', 8.5, 'Felt good on overhead press.'); 