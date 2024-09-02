import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';

type Query = {
  [key in keyof User]?: string;
};

// Define the initial state interface for the users slice.
export interface UsersState {
  users: User[];
  query: Query;
  filteredUsers: User[];
  loader: boolean;
  error: boolean;
}

// Initial state setup for the users slice
const initialState: UsersState = {
  users: [],
  query: {
    name: '',
    username: '',
    email: '',
    phone: '',
  },
  filteredUsers: [],
  loader: false,
  error: false,
};

// Async thunk to fetch users data from the API.
export const init = createAsyncThunk('users/fetch', async () => {
  return getUsers();
});

// Create a slice with reducers and extra reducers for handling state updates.
export const { reducer, actions } = createSlice({
  name: 'users',
  initialState: initialState,
  reducers: {
    filtered: (state, action: PayloadAction<{ name: keyof User; value: string }>) => {
      const {name, value} = action.payload;
      state.query[name] = value;

      state.filteredUsers = state.users.filter(item => {
        return Object.entries(state.query).every(([key, value]) => {
          const regExp = new RegExp(value.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
          return regExp.test((item[key as keyof User] ?? '').toString());          
        });
      });
    }

  },
  // Handle asynchronous actions with extra reducers.
  extraReducers: builder => {
    builder
      .addCase(init.fulfilled, (state, action) => {
        state.users = action.payload;
        state.filteredUsers = action.payload;
        state.loader = false;
      })
      .addCase(init.pending, (state) => {
        state.loader = true;
      })
      .addCase(init.rejected, (state) => {
        state.error = true;
        state.loader = false;
      });
  },  
});
