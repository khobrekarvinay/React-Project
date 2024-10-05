// weatherSlice.js
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    city: '',
    weather: null,
    current: null,
    location: null,
    forecast: null,
    loading: false,
    error: null,
    tempUnit: 'C', // Default to Celsius
  },
  reducers: {
    setCity: (state, action) => {
      state.city = action.payload;
    },
    setWeatherData: (state, action) => {
      state.weather = action.payload;
      state.current = action.payload.current;
      state.location = action.payload.location;
      state.forecast = action.payload.forecast;
      state.loading = false;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    toggleTempUnit: (state) => {
      state.tempUnit = state.tempUnit === 'C' ? 'F' : 'C';
    },
  },
});

export const { setCity, setWeatherData, setError, setLoading, toggleTempUnit } =
  weatherSlice.actions;

export default weatherSlice.reducer;

// Async function to fetch weather (not using createAsyncThunk)
export const fetchWeather = (city) => async (dispatch) => {
  const options = {
    method: 'GET',
    url: 'https://weatherapi-com.p.rapidapi.com/forecast.json',
    params: { q: city, days: '3' },
    headers: {
      'x-rapidapi-key': '068b589f6bmshaada0ea1175ad12p1a68b0jsncc7fec8f49a3',
      'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com',
    },
  };

  dispatch(setLoading(true)); // Set loading state

  try {
    const response = await axios.request(options);
    dispatch(setWeatherData(response.data)); // Set the weather data on success
  } catch (error) {
    dispatch(setError('Could not fetch weather data')); // Handle error
  }
};
