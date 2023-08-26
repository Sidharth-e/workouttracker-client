import React, { useState } from "react";
import apiService from "../API/API";
import ExerciseList from "./Exercise/ExerciseList";
import styles from "./styles.module.css";

const WorkoutForm = () => {
  const [workoutData, setWorkoutData] = useState({
    name: "",
    instructions: "",
    difficulty: "",
    equipment: "",
    muscle: "",
    reps: "",
    sets: "",
    type: "",
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    try {
      const message = await apiService.CustomWorkout(workoutData);
      console.log(message);
    } catch (error) {
      // Handle error
      console.error("Error creating workout:", error);
    }
  };

  return (
    <div>
      <ExerciseList />
      <div className={styles.custom_container}>
        <h2>Add Custom Workout Plan</h2>
        <form className={styles.custom} onSubmit={handleFormSubmit}>
          <div>
            <div>
              <label>Workout Name:</label>

              <input
              className={styles.inputs}
                type="text"
                value={workoutData.name}
                onChange={(e) =>
                  setWorkoutData({ ...workoutData, name: e.target.value })
                }
              />
            </div>
            <label>
              Description:
              <textarea
              className={styles.inputs}
                value={workoutData.instructions}
                onChange={(e) =>
                  setWorkoutData({
                    ...workoutData,
                    instructions: e.target.value,
                  })
                }
              />
            </label>
            <label>
              difficulty:
              <input
              className={styles.inputs}
                type="text"
                value={workoutData.difficulty}
                onChange={(e) =>
                  setWorkoutData({ ...workoutData, difficulty: e.target.value })
                }
              />
            </label>
            <label>
              equipment:
              <input
              className={styles.inputs}
                type="text"
                value={workoutData.equipment}
                onChange={(e) =>
                  setWorkoutData({ ...workoutData, equipment: e.target.value })
                }
              />
            </label>
          </div>
          <div>
            <label>
              equipment:
              <input
              className={styles.inputs}
                type="text"
                value={workoutData.muscle}
                onChange={(e) =>
                  setWorkoutData({ ...workoutData, muscle: e.target.value })
                }
              />
            </label>
            <label>
              reps:
              <input
              className={styles.inputs}
                type="text"
                value={workoutData.reps}
                onChange={(e) =>
                  setWorkoutData({ ...workoutData, reps: e.target.value })
                }
              />
            </label>
            <label>
              sets:
              <input
              className={styles.inputs}
                type="text"
                value={workoutData.sets}
                onChange={(e) =>
                  setWorkoutData({ ...workoutData, sets: e.target.value })
                }
              />
            </label>
            <label>
              type:
              <input
              className={styles.inputs}
                type="text"
                value={workoutData.type}
                onChange={(e) =>
                  setWorkoutData({ ...workoutData, type: e.target.value })
                }
              />
            </label>
          </div>
          <button className={styles.add_workout} type="submit">
            Add Workout
          </button>
        </form>
      </div>
    </div>
  );
};

export default WorkoutForm;
