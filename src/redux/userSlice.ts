import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  token: string;
}

const storedUser = localStorage.getItem('user');

const initialState: UserState = storedUser
  ? JSON.parse(storedUser)
  : {
      id: '',
      firstName: '',
      lastName: '',
      phone: '',
      token: ''
    };

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.id = action.payload.id;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.phone = action.payload.phone;
      state.token = action.payload.token;
    },
    clearUser: (state) => {
      state.id = 0;
      state.firstName = '';
      state.lastName = '';
      state.phone = '';
      state.token = '';
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
