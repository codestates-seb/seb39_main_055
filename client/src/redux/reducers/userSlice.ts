import { createSlice, Reducer } from "@reduxjs/toolkit";

interface UserInitialState {
  user: null;
}

const initialState: UserInitialState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
});

// export const {} = userSlice.actions;
export const userReducer: Reducer<typeof initialState> = userSlice.reducer;
