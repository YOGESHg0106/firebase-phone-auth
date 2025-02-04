import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PhoneAuth from "./components/PhoneAuth";
import WelcomePage from "./components/WelcomePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PhoneAuth />} />
        <Route path="/welcome" element={<WelcomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
