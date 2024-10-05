import React from 'react';
import WeatherApp from '../src/Redux/WeatherApp';
import { Provider } from 'react-redux';
import store from '../src/Redux/store'; // Import your store

function App() {
  return (
    <Provider store={store}>
      <WeatherApp />
    </Provider>
  );
}

export default App;
