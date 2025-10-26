// src/store/sessionSlice.js
import { createSlice } from "@reduxjs/toolkit";

// --- helpers ---
const loadSession = () => {
  try {
    const data = localStorage.getItem("session");
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
};

const saveSession = (state) => {
  try {
    localStorage.setItem("session", JSON.stringify(state));
  } catch {}
};

// --- slice ---
const initialState =
  loadSession() || {
    loggedIn: false,
    userType: null,
    userId: null,
  };

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    login: (state, action) => {
      state.loggedIn = true;
      state.userType = action.payload.userType;
      state.userId = action.payload.userId;
      saveSession(state);          // ✅ persist on login
    },
    logout: (state) => {
      state.loggedIn = false;
      state.userType = null;
      state.userId = null;
      localStorage.removeItem("session"); // ✅ clear on logout
    },
  },
});

export const { login, logout } = sessionSlice.actions;
export default sessionSlice.reducer;
