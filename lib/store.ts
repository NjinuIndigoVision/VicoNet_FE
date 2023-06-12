import { configureStore } from "@reduxjs/toolkit";
import { personnelSlice } from "./personnelSlice";
import { createWrapper } from "next-redux-wrapper";


export const store = configureStore({
    reducer: {
      [personnelSlice.name]: personnelSlice.reducer,
    },
    devTools: true,
  });

export type AppStore = ReturnType<typeof store.getState>;
export type AppDispatch = ReturnType<typeof store.dispatch>;