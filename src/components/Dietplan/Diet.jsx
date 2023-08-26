import styles from "./styles.module.css";
import Calories from "./Calories/Calories";
import NutritionComponent from "./Nutrition/Nutrition";
import Recipe from "./Recipe/Recipe";


const Diet = () => {
  return (
    <div className={styles.container}>
      <div className={styles.container_top}>
        <Calories />
        <NutritionComponent />
      </div>
      <div className={styles.Recipe}>
      <Recipe/>
      </div>
    </div>
  );
};

export default Diet;
