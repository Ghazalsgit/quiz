import "./App.css";
import React from "react";
import { Route, Routes } from "react-router-dom";
import ScoreList from "./pages/score-list";
import Home from "./pages/home";
import SignIn from "./pages/sign-in";
import PickUsername from "./pages/pick-username";
import StartPage from "./pages/start-page";
import CreatePage from "./pages/create-page";
import { QuizContextProvider } from "./contexts/QuizContextProvider";
import { UserContextProvider } from "./contexts/UserContextProvider";
import SignUp from "./pages/sign-up";
import { AnswerContextProvider } from "./contexts/AnswersContextProvider";
import CorrectQuiz from "./pages/correctQuiz";
import { PickedAnswerContextProvider } from "./contexts/PickedAnswerContextProvider";

function App() {
  return (
    <UserContextProvider>
      <QuizContextProvider>
        <AnswerContextProvider>
          <PickedAnswerContextProvider>
            <div className="App">
              <Routes>
                <Route path="/" element={<SignIn />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/home/:id" element={<Home />} />
                <Route path="/pick-username" element={<PickUsername />} />
                <Route path="/score-list" element={<ScoreList />} />
                <Route path="/start-page" element={<StartPage />} />
                <Route path="/create-page" element={<CreatePage />} />
                <Route path="/correct-quiz" element={<CorrectQuiz />} />
              </Routes>
            </div>
          </PickedAnswerContextProvider>
        </AnswerContextProvider>
      </QuizContextProvider>
    </UserContextProvider>
  );
}

export default App;
