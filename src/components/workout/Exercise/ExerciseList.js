import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import Loader from "../../Loader/Loader";
import apiService from '../../../service/API'; 

const exerciseTypes = [
  "cardio",
  "olympic_weightlifting",
  "plyometrics",
  "powerlifting",
  "strength",
  "stretching",
  "strongman",
];

const muscleGroups = [
  "abdominals",
  "abductors",
  "adductors",
  "biceps",
  "calves",
  "chest",
  "forearms",
  "glutes",
  "hamstrings",
  "lats",
  "lower_back",
  "middle_back",
  "neck",
  "quadriceps",
  "traps",
  "triceps",
];

const difficultyLevels = ["beginner", "intermediate", "expert"];

function ExerciseList() {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [exerciseRepsSets, setExerciseRepsSets] = useState([]);
  
  const [selectedDates, setSelectedDates] = useState([]); // State to store selected dates for exercises

  const handleRepsChange = (event, exerciseIndex) => {
    const newExerciseRepsSets = [...exerciseRepsSets];
    newExerciseRepsSets[exerciseIndex] = {
      ...newExerciseRepsSets[exerciseIndex],
      reps: event.target.value,
    };
    setExerciseRepsSets(newExerciseRepsSets);
  };

  const handleSetsChange = (event, exerciseIndex) => {
    const newExerciseRepsSets = [...exerciseRepsSets];
    newExerciseRepsSets[exerciseIndex] = {
      ...newExerciseRepsSets[exerciseIndex],
      sets: event.target.value,
    };
    setExerciseRepsSets(newExerciseRepsSets);
  };

  const [filterOptions, setFilterOptions] = useState({
    name: "",
    type: "",
    muscle: "",
    difficulty: "",
    offset: 0,
  });

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilterOptions((prevOptions) => ({
      ...prevOptions,
      [name]: value,
    }));
  };

  useEffect(() => {
    async function fetchExercises() {
      try {
        const fetchedExercises = await apiService.fetchExercises(filterOptions);
        setExercises(fetchedExercises);
      } catch (error) {
        console.error("Error fetching exercises:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchExercises();
  }, [filterOptions]);

  if (loading) {
    return <div><Loader/></div>;
  }

  const handleCardButtonClick = async (exerciseData, exerciseIndex) => {
    const { reps, sets } = exerciseRepsSets[exerciseIndex]; // Get reps and sets for the clicked exercise

    if (!reps || !sets) {
      // Make sure both reps and sets are provided before sending the request
      console.error("Reps and sets must be specified for the exercise.");
      return;
    }
    const exerciseWithRepsAndSets = {
      ...exerciseData,
      reps: reps,
      sets: sets,
      date: selectedDates[exerciseIndex],
    };
    try {
      const message = await apiService.createWorkout(exerciseWithRepsAndSets);
      console.log(message
      );
    } catch (error) {
      console.error("Error sending exercise data to API:", error);
    }
  };
  const handleDateChange = (event, exerciseIndex) => {
    const newSelectedDates = [...selectedDates];
    newSelectedDates[exerciseIndex] = event.target.value;
    setSelectedDates(newSelectedDates);
  };

  return (
    <div className={styles.exerciselist_container}>
      <h2>Exercise List</h2>
      <div className={styles.select}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={filterOptions.name}
            onChange={handleFilterChange}
          />
        </div>
        <div>
          <label>Type:</label>

          <select
            name="type"
            value={filterOptions.type}
            onChange={handleFilterChange}
          >
            <option value="">All</option>
            {exerciseTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Muscle:</label>
          <select
            name="muscle"
            value={filterOptions.muscle}
            onChange={handleFilterChange}
          >
            <option value="">All</option>
            {muscleGroups.map((muscle) => (
              <option key={muscle} value={muscle}>
                {muscle}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Difficulty:</label>
          <select
            name="difficulty"
            value={filterOptions.difficulty}
            onChange={handleFilterChange}
          >
            <option value="">All</option>
            {difficultyLevels.map((difficulty) => (
              <option key={difficulty} value={difficulty}>
                {difficulty}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className={styles.card_grid}>
        {exercises.map((exercise, index) => (
          <div key={exercise.id} className={styles.exercise_card}>
            <h4>{exercise.name}</h4>
            <p>Type: {exercise.type}</p>
            <p>Muscle: {exercise.muscle}</p>
            <p>Difficulty: {exercise.difficulty}</p>
            <p>Equipments: {exercise.equipment}</p>
            Instructions:
            <div className={styles.instructions}><p>{exercise.instructions}</p></div>
            <div>
              <div>
                <label>Reps:</label>

                <input
                  type="number"
                  value={exerciseRepsSets[index]?.reps || ""}
                  onChange={(event) => handleRepsChange(event, index)}
                />
              </div>
              <div>
                <label>Sets:</label>

                <input
                  type="number"
                  value={exerciseRepsSets[index]?.sets || ""}
                  onChange={(event) => handleSetsChange(event, index)}
                />
              </div>
            </div>
            <div>
              <label>Date:</label>
              <input
                type="date"
                value={selectedDates[index] || ""}
                onChange={(event) => handleDateChange(event, index)}
              />
            </div>
            <div>
              {" "}
              <button
                className={styles.add}
                onClick={() => handleCardButtonClick(exercise, index)}
              >
                Add
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExerciseList;
