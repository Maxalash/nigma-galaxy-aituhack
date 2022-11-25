import {configureStore} from "@reduxjs/toolkit"
import reposReducer from "./reposReducer";

export const store = configureStore({
  reducer: {
    repos: reposReducer
}});

