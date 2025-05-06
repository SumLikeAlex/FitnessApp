import axios from 'axios';

// Create base API configuration
const API = axios.create({
  // Change this URL to your actual backend when deployed
  baseURL: 'http://localhost:8000',  // Default FastAPI port
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Request interceptor for adding auth token to requests
API.interceptors.request.use(
  (config) => {
    // Get token from secure storage
    const token = localStorage.getItem('fitness_app_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Define API services for different endpoints
const authService = {
  login: (credentials) => API.post('/auth/login', credentials),
  register: (userData) => API.post('/auth/register', userData),
  logout: () => API.post('/auth/logout'),
};

const workoutService = {
  getWorkouts: () => API.get('/workouts'),
  getWorkoutById: (id) => API.get(`/workouts/${id}`),
  createWorkout: (workout) => API.post('/workouts', workout),
  updateWorkout: (id, workout) => API.put(`/workouts/${id}`, workout),
  deleteWorkout: (id) => API.delete(`/workouts/${id}`),
};

const exerciseService = {
  getExercises: () => API.get('/exercises'),
  getExerciseById: (id) => API.get(`/exercises/${id}`),
};

const nutritionService = {
  getMeals: () => API.get('/meals'),
  addMeal: (meal) => API.post('/meals', meal),
  updateMeal: (id, meal) => API.put(`/meals/${id}`, meal),
  deleteMeal: (id) => API.delete(`/meals/${id}`),
};

// Export all services
export {
  authService,
  workoutService,
  exerciseService,
  nutritionService,
};

// Export the API instance for custom calls
export default API;
