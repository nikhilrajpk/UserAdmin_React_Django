import {configureStore} from '@reduxjs/toolkit'
import userReducer from '../slices/userSlice'

// Load state from localStorage
const loadState = () => {
    try {
      const serializedState = localStorage.getItem('reduxState');
      return serializedState ? JSON.parse(serializedState) : undefined;
    } catch (err) {
      return undefined;
    }
  };
  
  // Save state to localStorage
  const saveState = (state) => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem('reduxState', serializedState);
    } catch (err) {
      console.error('Could not save state', err);
    }
  };

export const store = configureStore({
    reducer : {
        user : userReducer,
    },
    preloadedState: loadState(),
})

// Save Redux state on changes
store.subscribe(() => saveState(store.getState()));