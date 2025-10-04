// src/App.jsx
import React from "react";
import BiblePage from "./pages/BiblePage";
import WelcomePage from "./pages/WelcomePage";
import VideosPage from "./pages/VideosPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/alkitab" element={<BiblePage />} />
        <Route path="/video" element={<VideosPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
