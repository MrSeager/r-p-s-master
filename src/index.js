import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import MainGame from './MainGame';
import Game_2 from './Game_2';
import reportWebVitals from './reportWebVitals';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/r-p-s-master",
    element: <MainGame />,
  },
  {
    path: "/r-p-s-l-s-master", // Define the path for Game_2
    element: <Game_2 />, // Replace with the actual component name
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);

reportWebVitals();
