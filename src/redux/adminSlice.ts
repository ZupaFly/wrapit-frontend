import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AdminState {
  admins: { name: string; pass: string }[];
  isAuthenticated: boolean;
}

const initialState: AdminState = {
  admins: [
    { name: 'admin', pass: '12345' },
    { name: 'superadmin', pass: 'admin2024' }
  ],
  isAuthenticated: false,
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    checkAdmin: (state, action: PayloadAction<{ name: string; pass: string }>) => {
      const { name, pass } = action.payload;
      state.isAuthenticated = state.admins.some(admin => admin.name === name && admin.pass === pass);
    },
  },
});

export const { checkAdmin } = adminSlice.actions;
export default adminSlice.reducer;
