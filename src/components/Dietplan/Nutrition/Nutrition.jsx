import React, { useState } from 'react';
import apiService from '../../API/API';
import styles from './styles.module.css'

const NutritionComponent = () => {
  const [nutritionData, setNutritionData] = useState([]);
  const [query, setQuery] = useState('');

  const fetchData = async () => {
    if (query) {
      try {
        const recipes = await apiService.fetchNutritionData(query);
        setNutritionData(recipes);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  };

  const handleSearch = () => {
    fetchData();
  };

  return (
    <div className={styles.Nutrition_container}>
      <h2>Nutrition Information</h2>
      <input
        type="text"
        placeholder="Enter food item"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button className={styles.search} onClick={handleSearch}>Search</button>
      <div className={styles.Nutrition_grid_container}>
        <ul className={styles.Nutrition_workout_grid}>
          {nutritionData.map((res, index) => (
            <li key={index} className={styles.Nutrition_workout_card}>
              <h3>{res.name}</h3>
              <p>calories: {res.calories}</p>
              <p>serving_size_g: {res.serving_size_g}</p>
              <p>fat_total_g: {res.fat_total_g}</p>
              <p>fat_saturated_g: {res.fat_saturated_g}</p>
              <p>protein_g: {res.protein_g}</p>
              <p>sodium_mg: {res.sodium_mg}</p>
              <p>potassium_mg: {res.potassium_mg}</p>
              <p>cholesterol_mg: {res.cholesterol_mg}</p>
              <p>carbohydrates_total_g: {res.carbohydrates_total_g}</p>
              <p>fiber_g: {res.fiber_g}</p>
              <p>fiber_g: {res.fiber_g}</p>

            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NutritionComponent;
