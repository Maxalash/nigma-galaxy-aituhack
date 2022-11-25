import "./index.css"
import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import {Provider} from "react-redux";
import { store } from "./reducers";
import Home from "./components/home.jsx";


const container = document.getElementById('root');

const root = ReactDOMClient.createRoot(container);

root.render(
  <Provider store={store}>
  <Home tab="home" />

  </Provider>
);


