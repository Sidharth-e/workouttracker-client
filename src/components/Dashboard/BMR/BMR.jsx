import React, { useState, useEffect } from 'react';
import styles from './styles.module.css'
import apiService from '../../API/API'; 

const CalorieCalculator = () => {
  const [apiData, setApiData] = useState(null);
  const [calories, setCalories] = useState(null);
  const [totalcalories, setTotalCalories] = useState(null);
  const [numOfMeals, setNumOfMeals] = useState(3); // Default number of meals

  useEffect(() => {
    apiService.fetchUserData().then(data => setApiData(data));
  }, []);

  useEffect(() => {
    if (apiData) {
      // Calculate calories based on the fetched data
      const { gender, height, weight, goal, age, activityLevel } = apiData;

      let bmr = 0;
      if (gender === 'male') {
        bmr = 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age;
      } else if (gender === 'female') {
        bmr = 447.593 + 9.247 * weight + 3.098 * height - 4.33 * age;
      }

      let activityFactor = 1.2;
      switch (activityLevel) {
        case 'Lightly active':
          activityFactor = 1.375;
          break;
        case 'Moderately active':
          activityFactor = 1.55;
          break;
        case 'Very active':
          activityFactor = 1.725;
          break;
        case 'Super active':
          activityFactor = 1.9;
          break;
        default:
          break;
      }

      let calorieIntake = bmr * activityFactor;
      if (goal === 'weightloss') {
        calorieIntake -= 500;
      } else if (goal === 'weightgain') {
        calorieIntake += 300;
      }
      setTotalCalories(Math.round(calorieIntake))
      const calorieIntakePerMeal = calorieIntake / numOfMeals;
      setCalories(Math.round(calorieIntakePerMeal));
    }
  }, [apiData, numOfMeals]);

  return (
    <div className={styles.calorieCalculatorContainer}>
      <h2 className={styles.calorieCalculatorTitle}>Calories Needed</h2>
      <p className={styles.calorieCalculatorLabel}>Total calories needed: {totalcalories}</p>
      <p className={styles.calorieCalculatorLabel}>Number of Meals: {numOfMeals}</p>
      <label className={styles.calorieCalculatorLabel}>
        Enter Number of Meals:
        <input
          className={styles.calorieCalculatorInput}
          type="number"
          value={numOfMeals}
          onChange={(e) => setNumOfMeals(parseInt(e.target.value))}
        />
      </label>
      {calories !== null ? (
        <p className={styles.calorieCalculatorResult}>
          Your estimated calorie intake per meal: {calories} calories
        </p>
      ) : (
        <p className={styles.calorieCalculatorResult}>Loading...</p>
      )}
    </div>
  );
};

export default CalorieCalculator;
