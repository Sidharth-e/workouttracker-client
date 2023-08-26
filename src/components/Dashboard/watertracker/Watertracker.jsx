import React, { useState, useEffect } from 'react';
import styles from './styles.module.css'
import apiService from '../../API/API';

const WaterTracker = () => {
  const [waterConsumed, setWaterConsumed] = useState(0);
  const [waterEntries, setWaterEntries] = useState([]);
  const [editingEntry, setEditingEntry] = useState(null);
  const [editedWaterAmount, setEditedWaterAmount] = useState(0);

  useEffect(() => {
    apiService.fetchWaterEntries().then(entries => setWaterEntries(entries));
  }, []);

  // const fetchWaterEntries = async () => {
  //   const token = localStorage.getItem("token");
  
  //   if (!token) {
  //     return;
  //   }
  //   try {
  //     const response = await axios.get('http://localhost:8080/api/waterIntake', {
  //       headers: {
  //         "x-auth-token": token,
  //       },
  //     });
  //     setWaterEntries(response.data.waterIntakeToday);
  //   } catch (error) {
  //     console.error('Error fetching water intake:', error);
  //   }
  // };

  const handleWaterInputChange = event => {
    const newWaterConsumed = parseFloat(event.target.value);
    setWaterConsumed(newWaterConsumed);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    await apiService.saveWaterIntake(waterConsumed);
    setWaterConsumed(0);
    apiService.fetchWaterEntries().then(entries => setWaterEntries(entries));
  };

  const handleDeleteEntry = async entryId => {
    await apiService.deleteWaterEntry(entryId);
    apiService.fetchWaterEntries().then(entries => setWaterEntries(entries));
  };

  const handleEditEntry = (entryId) => {
    setEditingEntry(entryId);
    const entryToEdit = waterEntries.find((entry) => entry._id === entryId);
    setEditedWaterAmount(entryToEdit.amount);
  };

  const handleSaveEditedEntry = async (entryId) => {
    await apiService.editWaterEntry(entryId, editedWaterAmount);
    setEditingEntry(null);
    apiService.fetchWaterEntries().then(entries => setWaterEntries(entries));
  };

  const totalWaterIntake = waterEntries.reduce(
    (total, entry) => total + entry.amount,
    0
  );

  return (
    <div className={styles.waterTrackerContainer}>
      <h2>Water Intake Tracker</h2>
      <form onSubmit={handleSubmit}>
        <label className={styles.formLabel}>
          Enter the amount of water you've consumed (in cups):
          <input
            type="number"
            value={waterConsumed}
            onChange={handleWaterInputChange}
            className={styles.waterInput}
          />
        </label>
        <button type="submit" className={styles.submitButton}>
          Submit
        </button>
      </form>

      <h3 className={styles.totalWaterIntake}>
        Total Water Intake Today: {totalWaterIntake} cups
      </h3>

      <h3>Water Intake History</h3>
      <ul>
        {waterEntries.map(entry => (
          <li key={entry._id} className={styles.waterEntry}>
            {editingEntry === entry._id ? (
              <>
                <input
                  type="number"
                  value={editedWaterAmount}
                  onChange={(event) => setEditedWaterAmount(event.target.value)}
                />
                <button className={styles.saveButton} onClick={() => handleSaveEditedEntry(entry._id)}>Save</button>
              </>
            ) : (
              <>
                {entry.amount} cups - {new Date(entry.date).toLocaleString()}
                <button className={styles.editButton} onClick={() => handleEditEntry(entry._id)}>Edit</button>
                <button className={styles.deleteButton} onClick={() => handleDeleteEntry(entry._id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WaterTracker;
