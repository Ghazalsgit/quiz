import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./start-page.scss";
import Header from "../components/answer-button/header";

function StartPage() {
  const [quizId, setQuizId] = useState<string>("");

  const navigate = useNavigate();

  const startQuiz = () => {
    navigate(`/home/${quizId}`);
  };

  const createQuiz = () => {
    navigate("/create-page");
  };

  const navigateToScores = () => {
    navigate("/score-list");
  };

  return (
    <div className="start-page">
      <Header />

      <h3>Write the code to kick off the quiz and let the challenge begin!</h3>
      <input
        type="text"
        placeholder="e.g. JHB5hv657TGu76ftfvt"
        onChange={(e) => setQuizId(e.target.value)}
      />
      <button className="top" onClick={startQuiz}>
        Start quiz
      </button>
      <p className="bottom">
        Ready to host your own quiz? Your turn to take the lead!
      </p>
      <button onClick={createQuiz}>Create quiz</button>
      <div onClick={navigateToScores} className="linkToScore">
        <p>Explore the Table of Scores</p>
      </div>
    </div>
  );
}

export default StartPage;
