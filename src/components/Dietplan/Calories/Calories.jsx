import React, { useState } from "react";
import styles from './styles.module.css'
import apiService from "../../API/API";

const CaloriesComponent = () => {
  const [activity, setActivity] = useState("");
  const [weight, setWeight] = useState(160);
  const [duration, setDuration] = useState(60);
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const data = await apiService.fetchActivityData(activity, weight, duration);
      setResponse(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className={styles.container}>
      <h2>Calories Burned Calculator</h2>
      <div>
        <label>
          Activity (Run,walk etc):
          <input
            type="text"
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Weight (lbs):
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Duration (minutes):
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </label>
      </div>
      <div>
        <button className={styles.calculate} onClick={handleSubmit} disabled={loading}>
          {loading ? "Loading..." : "Calculate"}
        </button>
      </div>
      <div className={styles.grid_container}>
        <ul className={styles.workout_grid}>
          {response.map((res, index) => (
            <li key={index} className={styles.workout_card}>
              <h3>{res.name}</h3>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CaloriesComponent;
