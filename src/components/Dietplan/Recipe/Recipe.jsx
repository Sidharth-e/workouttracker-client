import React, { useState } from 'react';
import apiService from '../../API/API';
import styles from './styles.module.css'

const Recipe = () => {
  const [Recipe, setRecipe] = useState([]);
  const [query, setQuery] = useState('');

  const fetchData = async () => {
    if (query) {
      try {
        const recipes = await apiService.fetchRecipes(query);
        setRecipe(recipes);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  };

  const handleSearch = () => {
    fetchData();
  };

  return (
    <div className={styles.Recipe_container}>
      <h2>Recipe Information</h2>
      <input
        type="text"
        placeholder="Enter food item"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button className={styles.Recipe_search} onClick={handleSearch}>Search</button>
      <div className="Recipe_grid_container">
        <ul className="Recipe_workout_grid">
          {Recipe.map((res, index) => (
            <li key={index} className="Recipe_workout_card">
              <h3>{res.title}</h3>
              <p>ingredients: {res.ingredients}</p>
              <p>servings: {res.servings}</p>
              <p>instructions: {res.instructions}</p>

            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Recipe;
