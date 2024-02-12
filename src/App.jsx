// App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Welcome, Quiz } from "./components";
import { jsQuiz } from "./constants";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/quiz" element={<Quiz questions={jsQuiz.questions} />} />
      </Routes>
    </Router>
  );
}

export default App;
