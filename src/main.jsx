import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PianoRollDetails from "./page/PianoRollDetails.page.jsx";
import Layout from "./layout/Layout.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    ErrorBoundaryFallback: () => <h1>Something went wrong!</h1>,
    children: [
      {
        path: "/",
        element: <App />,
        ErrorBoundaryFallback: () => <h1>Something went wrong!</h1>,
      },
      {
        path: "piano-roll/:id",
        element: <PianoRollDetails />,
        ErrorBoundaryFallback: () => <h1>Something went wrong!</h1>,
      },
    ],
  },
  {
    "/error": () => <h1>Something went wrong!</h1>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
