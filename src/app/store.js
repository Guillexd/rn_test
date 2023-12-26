import { configureStore } from "@reduxjs/toolkit";
import characterReducer from "../features/characterList/characterListSlice";

export const store = configureStore({
  reducer: {
    characterList: characterReducer
  },
});
