import { configureStore } from '@reduxjs/toolkit';
import userReducer from './User/userSlice'; // Adjust the path accordingly

const store = configureStore({
  reducer: {
    user: userReducer,
    // Add other reducers if you have them
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
