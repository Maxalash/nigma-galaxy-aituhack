import {configureStore} from "@reduxjs/toolkit"
import reposReducer from "./reposReducer";
import productsReducer from "./productsReducer";

export const store = configureStore({
  reducer: {
    repos: reposReducer,
    products: productsReducer
}});

