import stlyes from './styles.module.css'
import Plans from './Workoutplan/plans';
import BMR from './BMR/BMR'
import WaterTracker from './watertracker/Watertracker';

const Dashboard = () => {
  return (
    <div className={stlyes.grid_container}>
      <div className={stlyes.Dashboard_top_container}>
        
      <BMR/>
      <WaterTracker/>
      </div>
      <Plans/>
  </div>
  );
};

export default Dashboard;
