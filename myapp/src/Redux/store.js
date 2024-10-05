// store.js
import { configureStore } from '@reduxjs/toolkit';
import weatherSlice from './Weatherslice'; // Import your weather slice

const store = configureStore({
  reducer: {
    weather: weatherSlice.reducer,
  },
});

export default store;
