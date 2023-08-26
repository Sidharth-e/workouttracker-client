import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_BASE_URL; // Update with your API's base URL

const instance = axios.create({
  baseURL: API_BASE_URL,
});

const APININJA = axios.create({
  baseURL: "https://api.api-ninjas.com/v1/",
});

const getToken = () => localStorage.getItem('token');

const apiService = {
  loginUser: async (data) => {
    try {
      const { data: res }  = await instance.post('/auth', data);
      localStorage.setItem('token', res.data);
    } catch (error) {
      if (error.response && error.response.status >= 400 && error.response.status <= 500) {
        throw new Error(error.response.data.message);
      } else {
        throw error;
      }
    }
  },
  signup: async (userData) => {
    try {
      const response = await instance.post('/register', userData);
      return response.data;
    } catch (error) {
      if (error.response && error.response.status >= 400 && error.response.status <= 500) {
        throw new Error(error.response.data.message);
      } else {
        throw error;
      }
    }
  },
  fetchWaterEntries: async () => {
    try {
      const response = await instance.get('/waterIntake', {
        headers: {
          'x-auth-token': getToken(),
        },
      });

      return response.data.waterIntakeToday;
    } catch (error) {
      console.error('Error fetching water intake:', error);
      return [];
    }
  },
  saveWaterIntake: async (waterConsumed) => {
    try {
      await instance.post('/waterIntake', { amount: waterConsumed }, {
        headers: {
          'x-auth-token': getToken(),
        },
      });

      console.log('Water intake saved');
    } catch (error) {
      console.error('Error saving water intake:', error);
    }
  },
  deleteWaterEntry: async (entryId) => {
    try {
      await instance.delete(`/waterIntake/${entryId}`, {
        headers: {
          'x-auth-token': getToken(),
        },
      });

      console.log('Water intake entry deleted');
    } catch (error) {
      console.error('Error deleting water intake entry:', error);
    }
  },
  editWaterEntry: async (entryId, newAmount) => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        return;
      }

      await instance.put(
        `/waterIntake/${entryId}`,
        { amount: newAmount },
        {
          headers: {
            'x-auth-token': token,
          },
        }
      );

      console.log('Water intake entry edited');
    } catch (error) {
      console.error('Error editing water intake entry:', error);
    }
  },
  fetchUserData: async () => {
    try {
      const token = getToken();

      if (!token) {
        // Handle token not found (user not logged in) scenario here if needed
        return null;
      }

      const response = await instance.get('/user', {
        headers: {
          'x-auth-token': token,
        },
      });

      return response.data.Userdetails[0];
    } catch (error) {
      console.error('Error fetching user data:', error);
      return null;
    }
  },
  fetchWorkouts: async () => {
    try {
      const token = getToken();

      if (!token) {
        // Handle token not found (user not logged in) scenario here if needed
        return [];
      }

      const response = await instance.get('/workout', {
        headers: {
          'x-auth-token': token,
        },
      });

      return response.data.workoutPlans;
    } catch (error) {
      console.error('Error fetching workouts:', error);
      return [];
    }
  },
  deleteWorkout: async (workoutId) => {
    try {
      const token = getToken();

      if (!token) {
        // Handle token not found (user not logged in) scenario
        return;
      }

      await instance.delete(`/workout/${workoutId}`, {
        headers: {
          'x-auth-token': token,
        },
      });
    } catch (error) {
      console.error('Error deleting workout:', error);
    }
  },
  toggleWorkoutStatus: async (workoutId, currentStatus) => {
    try {
      const token = getToken();

      if (!token) {
        // Handle token not found (user not logged in) scenario
        return;
      }
      const newStatus = currentStatus === 'completed' ? 'pending' : 'completed';

      await instance.put(
        `/workout/${workoutId}`,
        { status: newStatus },
        {
          headers: {
            'x-auth-token': token,
          },
        }
      );
    } catch (error) {
      console.error('Error toggling workout status:', error);
    }
  },
  fetchRecipes: async (query) => {
    if (!query) {
      return [];
    }

    try {
      const response = await APININJA.get(`recipe?query=${query}`, {
        headers: {
          'X-Api-Key': process.env.REACT_APP_API_NINJA,
        },
      });

      return response.data;
    } catch (error) {
      console.error('Error fetching recipes:', error);
      return [];
    }
  },
  fetchNutritionData: async (query) => {
    if (!query) {
      return [];
    }

    try {
      const response = await APININJA.get(`nutrition?query=${query}`, {
        headers: {
          'X-Api-Key': process.env.REACT_APP_API_NINJA,
        },
      });

      return response.data;
    } catch (error) {
      console.error('Error fetching nutrition Data:', error);
      return [];
    }
  },
  fetchExercises: async (filterOptions) => {
    try {
      const response = await APININJA.get(`exercises`, {
        headers: {
          'X-Api-Key': process.env.REACT_APP_API_NINJA,
        },
        params:filterOptions
      });

      return response.data;
    } catch (error) {
      console.error('Error fetching nutrition Data:', error);
      return [];
    }
  },
  fetchActivityData: async (activity, weight, duration) => {
    try {
      const response = await APININJA.get(`caloriesburned?activity=${activity}&weight=${weight}&duration=${duration}`, {
        headers: {
          'X-Api-Key': process.env.REACT_APP_API_NINJA,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  },
  createWorkout: async (workoutData) => {
    try {
      const token = getToken();
      if (!token) {
        // Handle token not found (user not logged in) scenario
        return null;
      }

      const response = await instance.post('/workout', workoutData, {
        headers: {
          'x-auth-token': token,
        },
      });

      return response.data.message;
    } catch (error) {
      console.error('Error creating workout:', error);
      throw error;
    }
  },
  CustomWorkout: async (workoutData) => {
    try {
      const token = getToken();
      if (!token) {
        // Handle token not found (user not logged in) scenario
        return null;
      }

      const response = await instance.post('/workout', workoutData, {
        headers: {
          'x-auth-token': token,
        },
      });

      return response.data.message;
    } catch (error) {
      console.error('Error creating workout:', error);
      throw error;
    }
  },
};

export default apiService;
