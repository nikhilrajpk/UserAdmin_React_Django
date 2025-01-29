import {configureStore} from '@reduxjs/toolkit'
import userReducer from '../slices/userSlice'

// Load state from localStorage
const loadState = () => {
    try {
      const serializedState = localStorage.getItem('reduxState');
      if (!serializedState) return undefined;

      const parsedState = JSON.parse(serializedState);
      
      return {
          user: parsedState, 
      };
    } catch (err) {
        console.error('Could not load state', err);
        return undefined;
    }
  };
  
  // Save state to localStorage
  const saveState = (state) => {
    try {
      const serializedState = JSON.stringify(state.user); // Store only user state
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