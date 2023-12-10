import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Users.module.css";

export default function Users() {
  const [response, setResponse] = useState([]);
  const [editStates, setEditStates] = useState({});
  const [editedData, setEditedData] = useState({});

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 5000);
    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, []);

  async function fetchData() {
    const token = localStorage.getItem("token");

    const url = "http://localhost:8080/api/admin";
    try {
      const { data: res } = await axios.get(url, {
        headers: {
          "x-auth-token": token,
        },
      });
      setResponse(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async function deleteRecord(id) {
    const token = localStorage.getItem("token");
    const url = `http://localhost:8080/api/admin/${id}`;
    try {
      await axios.delete(url, {
        headers: {
          "x-auth-token": token,
        },
      });
      fetchData(); // Refresh data after deletion
    } catch (error) {
      console.error("Error deleting record:", error);
    }
  }

  async function updateRecord(id) {
    const updatedData = editedData[id];
    const token = localStorage.getItem("token");
    const url = `http://localhost:8080/api/admin/${id}`;
    try {
      await axios.put(url, updatedData, {
        headers: {
          "x-auth-token": token,
        },
      });
      toggleEditMode(id); // Exit edit mode after update
      fetchData(); // Refresh data after update
    } catch (error) {
      console.error("Error updating record:", error);
    }
  }

  function toggleEditMode(id) {
    setEditedData((prevEditedData) => ({
      ...prevEditedData,
      [id]: { ...response.find((item) => item._id === id) },
    }));
    setEditStates((prevEditStates) => ({
      ...prevEditStates,
      [id]: !prevEditStates[id],
    }));
  }

  function handleFieldChange(id, field, value) {
    setEditedData((prevEditedData) => ({
      ...prevEditedData,
      [id]: {
        ...prevEditedData[id],
        [field]: value,
      },
    }));
  }

  return (
    <>
      <table className={styles.rwd_table}>
        <tbody>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email ID</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Weight</th>
            <th>Height</th>
            <th>Health Goal</th>
            <th>Activity Level</th>
            <th></th>
          </tr>
          {response.filter(items=>!items.isAdmin)
          .map((items, key) => (
            <tr key={key}>
              <td data-th="Firstname">
                {editStates[items._id] ? (
                  <input
                  className={styles.input}
                    type="text"
                    value={editedData[items._id]?.firstName || ""}
                    onChange={(e) =>
                      handleFieldChange(items._id, "firstName", e.target.value)
                    }
                  />
                ) : (
                  items.firstName
                )}
              </td>
              <td data-th="lastName">
                {editStates[items._id] ? (
                  <input
                  className={styles.input}
                    type="text"
                    value={editedData[items._id]?.lastName || ""}
                    onChange={(e) =>
                      handleFieldChange(items._id, "lastName", e.target.value)
                    }
                  />
                ) : (
                  items.lastName
                )}
              </td>
              <td data-th="email">
                {editStates[items._id] ? (
                  <input
                  className={styles.input}
                    type="email"
                    value={editedData[items._id]?.email || ""}
                    onChange={(e) =>
                      handleFieldChange(items._id, "email", e.target.value)
                    }
                  />
                ) : (
                  items.email
                )}
              </td>
              <td data-th="age">
                {editStates[items._id] ? (
                  <input
                  className={styles.input}
                    type="text"
                    value={editedData[items._id]?.age || ""}
                    onChange={(e) =>
                      handleFieldChange(items._id, "age", e.target.value)
                    }
                  />
                ) : (
                  items.age
                )}
              </td>
              <td data-th="gender">
                {editStates[items._id] ? (
                  <input
                  className={styles.input}
                    type="text"
                    value={editedData[items._id]?.gender || ""}
                    onChange={(e) =>
                      handleFieldChange(items._id, "gender", e.target.value)
                    }
                  />
                ) : (
                  items.gender
                )}
              </td>
              <td data-th="weight">
                {editStates[items._id] ? (
                  <input
                  className={styles.input}
                    type="text"
                    value={editedData[items._id]?.weight || ""}
                    onChange={(e) =>
                      handleFieldChange(items._id, "weight", e.target.value)
                    }
                  />
                ) : (
                  items.weight
                )}
              </td>
              <td data-th="height">
                {editStates[items._id] ? (
                  <input
                  className={styles.input}
                    type="text"
                    value={editedData[items._id]?.height || ""}
                    onChange={(e) =>
                      handleFieldChange(items._id, "height", e.target.value)
                    }
                  />
                ) : (
                  items.height
                )}
              </td>
              <td data-th="healthGoal">
                {editStates[items._id] ? (
                  <input
                  className={styles.input}
                    type="text"
                    value={editedData[items._id]?.healthGoal || ""}
                    onChange={(e) =>
                      handleFieldChange(items._id, "healthGoal", e.target.value)
                    }
                  />
                ) : (
                  items.healthGoal
                )}
              </td>
              <td data-th="activityLevel">
                {editStates[items._id] ? (
                  <input
                  className={styles.input}
                    type="text"
                    value={editedData[items._id]?.activityLevel || ""}
                    onChange={(e) =>
                      handleFieldChange(
                        items._id,
                        "activityLevel",
                        e.target.value
                      )
                    }
                  />
                ) : (
                  items.activityLevel
                )}
              </td>
              <td>
                <button className={styles.button} onClick={() => deleteRecord(items._id)}>Delete</button>
                {editStates[items._id] ? (
                  <>
                    <button className={styles.button} onClick={() => updateRecord(items._id, items)}>
                      Save
                    </button>
                    <button className={styles.button} onClick={() => toggleEditMode(items._id)}>
                      Cancel
                    </button>
                  </>
                ) : (
                  <button className={styles.button} onClick={() => toggleEditMode(items._id)}>
                    Edit
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
