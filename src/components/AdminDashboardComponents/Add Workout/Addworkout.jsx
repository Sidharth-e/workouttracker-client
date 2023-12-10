import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Addworkout.module.css";

export default function Addworkout() {
  const [response, setResponse] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCardData, setSelectedCardData] = useState(null); // State to store the selected card data
  const [active, setactive] = useState(false);

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

  // Function to open the modal and set selected card data
  const openModal = (data) => {
    setSelectedCardData(data);
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setSelectedCardData(null); // Clear selected data when closing the modal
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className={styles.gridContainer}>
        {response.map((item, index) => (
          <div
            key={index}
            className={styles.gridItem}
            onClick={() => openModal(item)}
          >
            <div>First Name: {item.firstName}</div>
            <div>Last Name: {item.lastName}</div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <span className={styles.closeModal} onClick={closeModal}>
              &times;
            </span>
            {selectedCardData && (
              <div>
                <h2>Selected Card Data</h2>
                <button
                  className={styles.button}
                  onClick={() => {
                    setactive(!active);
                  }}
                >
                  {active ? "Go back" : "Add workoutplan"}
                </button>
                {active ? (
                  <></>
                ) : (
                  <>
                    <div>First Name: {selectedCardData.firstName}</div>
                    <div>Last Name: {selectedCardData.lastName}</div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
