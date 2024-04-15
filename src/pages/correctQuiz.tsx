import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./create-page.scss";

import { QuizContext } from "../contexts/QuizContextProvider";
import { AnswerContext } from "../contexts/AnswersContextProvider";
import { PickedAnswerContext } from "../contexts/PickedAnswerContextProvider";
import "./correctQuiz.scss";

function CorrectQuiz() {
  const quizData = useContext(QuizContext);
  const answerData = useContext(AnswerContext);
  const pickedAnswersData = useContext(PickedAnswerContext);

  const navigate = useNavigate();

  const navigateBack = () => {
    navigate(-1);
  };

  const getAnswerForQuestion = (questionId: string) => {
    const answer = answerData?.find((answer) =>
      answer.correctAnswers.some(
        (correctAnswer) => correctAnswer.questionId === questionId
      )
    );
    return (
      answer?.correctAnswers.map(
        (correctAnswer) => correctAnswer.correctAnswer
      ) || []
    );
  };

  const getUserPickedAnswersForQuestion = (questionId: string) => {
    const userPickedAnswers = pickedAnswersData?.userPickedAnswers || [];

    const matchingAnswers = userPickedAnswers
      .filter((userAnswer) => userAnswer.questionId === questionId)
      .map((userAnswer) => userAnswer.correctAnswer);

    return matchingAnswers || [];
  };

  const isOptionCorrect = (questionId: string, option: string) => {
    const correctAnswers = getAnswerForQuestion(questionId);
    const userPickedAnswers = getUserPickedAnswersForQuestion(questionId);
    return (
      correctAnswers.includes(option) && userPickedAnswers.includes(option)
    );
  };

  const isOptionIncorrect = (questionId: string, option: string) => {
    const correctAnswers = getAnswerForQuestion(questionId);
    const userPickedAnswers = getUserPickedAnswersForQuestion(questionId);
    return (
      !correctAnswers.includes(option) && userPickedAnswers.includes(option)
    );
  };

  return (
    <div className="correct-quiz">
      <div className="back-button" onClick={navigateBack}>
        <p>Back</p>
      </div>
      <h2>{quizData?.quizTitle}</h2>
      {quizData?.questions.map((question) => (
        <div key={question.uid} className="question-box">
          <h3>{question.text}</h3>
          <ul>
            {question.options.map((option, index) => (
              <li
                key={index}
                className={
                  isOptionCorrect(question.uid, option)
                    ? "correct"
                    : isOptionIncorrect(question.uid, option)
                    ? "incorrect"
                    : ""
                }
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default CorrectQuiz;
