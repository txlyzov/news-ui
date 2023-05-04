import React from "react";
import "./App.scss";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./router/Router";

function App() {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
