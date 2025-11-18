import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  id: string | null;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  role: string;
  avatar: string;
  createdat: string;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  id: null,
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  role: "",
  avatar: "",
  createdat: "",
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser(
      state,
      action: PayloadAction<Omit<UserState, "isAuthenticated">>
    ) {
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
      };
    },
    logoutUser() {
      return {
        ...initialState,
      };
    },
    deleteUser() {
      return {
        ...initialState,
      };
    },
    updateUser(
      state,
      action: PayloadAction<Partial<Omit<UserState, "isAuthenticated" | "_id">>>
    ) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { loginUser, logoutUser, deleteUser, updateUser } =
  userSlice.actions;
export default userSlice.reducer;
