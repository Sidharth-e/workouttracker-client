import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import apiService from "../../API/API";

const Plans = () => {
  const [workouts, setWorkouts] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all"); // "all", "completed", or "pending"

  useEffect(() => {
    apiService.fetchWorkouts().then(workouts => setWorkouts(workouts));
  }, []);

  const deleteWorkout = async (workoutId) => {
    await apiService.deleteWorkout(workoutId);
    setWorkouts((prevWorkouts) =>
      prevWorkouts.filter((workout) => workout._id !== workoutId)
    );
  };

  const toggleWorkoutStatus = async (workoutId, currentStatus) => {
    await apiService.toggleWorkoutStatus(workoutId, currentStatus);
    setWorkouts((prevWorkouts) =>
      prevWorkouts.map((workout) =>
        workout._id === workoutId
          ? { ...workout, status: currentStatus === 'completed' ? 'pending' : 'completed' }
          : workout
      )
    );
  };

  const handleStatusFilterChange = (newFilter) => {
    setStatusFilter(newFilter);
  };

  const filteredWorkouts =
    statusFilter === "all"
      ? workouts
      : workouts.filter((workout) => workout.status === statusFilter);
  return (
    <div className={styles.grid_container}>
      <h2>Workout Plans</h2>
      <div>
        <button
          className={statusFilter === "all" ? styles.active : ""}
          onClick={() => handleStatusFilterChange("all")}
        >
          All
        </button>
        <button
          className={statusFilter === "completed" ? styles.active : ""}
          onClick={() => handleStatusFilterChange("completed")}
        >
          Completed
        </button>
        <button
          className={statusFilter === "pending" ? styles.active : ""}
          onClick={() => handleStatusFilterChange("pending")}
        >
          Pending
        </button>
      </div>
      <ul className={styles.workout_grid}>
        {filteredWorkouts.map((workout) => (
          <li key={workout._id} className={styles.workout_card}>
            <h3>{workout.name}</h3>
            <p>{workout.description}</p>
            <p>Type: {workout.type}</p>
            <p>Muscle: {workout.muscle}</p>
            <p>Difficulty: {workout.difficulty}</p>
            <p>Equipments: {workout.equipment}</p>
            <p>Reps: {workout.reps}</p>
            <p>Sets: {workout.sets}</p>
            <p>status:{workout.status}</p>

            {/* <p>Instructions: {workout.instructions}</p> */}
            <button
              className={styles.delete}
              onClick={() => deleteWorkout(workout._id)}
            >
              Delete
            </button>
            <button
              className={styles.status}
              onClick={() => toggleWorkoutStatus(workout._id, workout.status)}
            >
              {workout.status === "completed" ? "Pending" : "Completed"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Plans;
