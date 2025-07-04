/* eslint-disable @typescript-eslint/no-explicit-any */
// ===== src/features/auth/authActions.ts =====
import { createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = import.meta.env.VITE_API_URL;


export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (
    { username, password }: { username: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await fetch(`${API_URL}/login`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        return rejectWithValue(data.message || 'Identifiants invalides');
      }

      const userRes = await fetch(`${API_URL}/me`, {
        credentials: 'include',
      });

      if (!userRes.ok) throw new Error('Non authentifié');

      const userData = await userRes.json();
      return userData.user;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchUserData = createAsyncThunk('auth/fetchUserData', async (_, { rejectWithValue }) => {
  try {
    const res = await fetch(`${API_URL}/me`, { credentials: 'include' });
    if (!res.ok) throw new Error('Non authentifié');
    const data = await res.json();
    return data.user;
  } catch (err: any) {
    return rejectWithValue(err.message);
  }
});

export const logoutUser = createAsyncThunk('auth/logoutUser', async () => {
  await fetch(`${API_URL}/logout`, {
    method: 'POST',
    credentials: 'include',
  });
});
