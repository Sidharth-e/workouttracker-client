import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import apiService from '../../../service/API'; 

const Plans = () => {
  const [workouts, setWorkouts] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all"); // "all", "completed", or "pending"
  const [selectedDay, setSelectedDay] = useState(null);
  const [apiResponseStatus, setApiResponseStatus] = useState(null);
  useEffect(() => {
    const today = new Date()
      .toLocaleDateString("en-US", { weekday: "short" })
      .toLowerCase();
    setSelectedDay(today);
  }, []);
  useEffect(() => {
    if (selectedDay) {
      const selectedDate = calculateDate(selectedDay);
      apiService
        .fetchWorkoutsByDate(selectedDate)
        .then((workouts) => {
          setWorkouts(workouts);
          setApiResponseStatus("success");
        })
        .catch((error) => {
          if (error.response && error.response.status === 404) {
            setApiResponseStatus("notFound");
          } else {
            console.error("Error fetching workouts:", error);
          }
        });
    }
  }, [selectedDay]);
  const calculateDate = (selectedDay) => {
    const today = new Date();
    const currentDay = today.getDay();
    const dayIndex = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"].indexOf(
      selectedDay
    );
    const diffDays = (dayIndex - currentDay + 7) % 7;
    const selectedDate = new Date(today);
    selectedDate.setDate(today.getDate() + diffDays);
    return selectedDate.toISOString().split("T")[0];
  };
  const handleDayButtonClick = (day) => {
    setSelectedDay(day);
  };

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
          ? {
              ...workout,
              status: currentStatus === "completed" ? "pending" : "completed",
            }
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
      <div className={styles.dayfilters}>
      <div className={styles.scrollcontainer}>
    <div className={styles.scrollcontent}>
      <button
        className={selectedDay === "mon" ? styles.active : ""}
        onClick={() => handleDayButtonClick("mon")}
      >
        Mon
      </button>
      <button
        className={selectedDay === "tue" ? styles.active : ""}
        onClick={() => handleDayButtonClick("tue")}
      >
        Tue
      </button>
      <button
        className={selectedDay === "wed" ? styles.active : ""}
        onClick={() => handleDayButtonClick("wed")}
      >
        Wed
      </button>
      <button
        className={selectedDay === "thu" ? styles.active : ""}
        onClick={() => handleDayButtonClick("thu")}
      >
        Thu
      </button>
      <button
        className={selectedDay === "fri" ? styles.active : ""}
        onClick={() => handleDayButtonClick("fri")}
      >
        Fri
      </button>
      <button
        className={selectedDay === "sat" ? styles.active : ""}
        onClick={() => handleDayButtonClick("sat")}
      >
        Sat
      </button>
      <button
        className={selectedDay === "sun" ? styles.active : ""}
        onClick={() => handleDayButtonClick("sun")}
      >
        Sun
      </button>
    </div>
  </div>
</div>

      {apiResponseStatus === "notFound" ? (
        <></>
      ) : (
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
      )}
      <ul className={styles.workout_grid}>
        {apiResponseStatus === "notFound" ? (
          <p>No workout plans found for the selected date.</p>
        ) : (
          <>
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
                  onClick={() =>
                    toggleWorkoutStatus(workout._id, workout.status)
                  }
                >
                  {workout.status === "completed" ? "Pending" : "Completed"}
                </button>
              </li>
            ))}
          </>
        )}
      </ul>
    </div>
  );
};

export default Plans;
