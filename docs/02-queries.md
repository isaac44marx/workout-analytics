Analytics reports and query targets

Each report below should have:

Definition (what it measures)

Inputs (time window, exercise filter)

Output columns

Notes (edge cases)

Report 1: Session summary

Definition

For each session: total sets, total exercises, total volume.

Volume definition

sum(reps × weight) with unit handled (either assume one unit or convert)

Output

session_date

total_sets

distinct_exercises

total_volume

Edge cases

sessions with no sets should show zeros or be hidden

Report 2: Weekly volume per exercise

Definition

Total weekly volume by exercise.

Output

exercise_name

week_start_date

weekly_volume

Notes

Use date bucketing to week

Consider filtering to last N weeks

Report 3: Rolling 7-day volume

Definition

Daily volume with a rolling 7-day sum.

Output

day

daily_volume

rolling_7d_volume

Notes

Window function with ORDER BY day

Report 4: Exercise frequency

Definition

How often each exercise appears across sessions.

Output

exercise_name

session_count

last_performed_date

Notes

“appears” means at least one set in a session

Report 5: PR detection (choose one PR definition)

Pick one:

Heaviest weight ever for reps >= 1

Best estimated 1RM using a formula (e.g., Epley)

Output

exercise_name

pr_date

pr_value

supporting_set (reps, weight)

Notes

Clarify if PR is weight-based or 1RM-based

Report 6: Progress trend per exercise

Definition

Compare weekly best set (or best estimated 1RM) over time.

Output

week_start_date

best_value_that_week

week_over_week_change

Notes

Use LAG() to compute deltas

Report 7: Top sets for an exercise

Definition

Show top N sets for a chosen exercise (by weight or estimated 1RM).

Output

session_date

reps

weight

value_metric

Notes

Great for a drill-down page

Report 8: Muscle group or category breakdown (optional)

Definition

Weekly volume by category if exercises have categories.

Output

category

week_start_date

weekly_volume

Notes

Only if you add exercise categories