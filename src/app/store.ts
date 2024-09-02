import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { reducer } from '../features/usersSlice';

// Configure the Redux store and add the users slice reducer.
export const store = configureStore({
  reducer: {
    users: reducer,
  },
});

// Define a type for the dispatch function used in the app.
export type AppDispatch = typeof store.dispatch;
// Define a type for the root state of the store.
export type RootState = ReturnType<typeof store.getState>;

// Define a type for creating asynchronous thunk actions.
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;