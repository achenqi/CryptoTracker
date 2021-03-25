import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import mapReducer from '../features/map/mapSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    map: mapReducer
  },
});
