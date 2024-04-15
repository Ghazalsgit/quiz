import "./home.scss";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AnswerButton from "../components/answer-button/answer-button";

import { QuizContext } from "../contexts/QuizContextProvider";
import { Answer } from "../interfaces";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getFirestore,
  updateDoc,
} from "firebase/firestore";
import app from "../firebaseConfig";
import { AnswerContext } from "../contexts/AnswersContextProvider";
import { getAuth } from "firebase/auth";
import { UserContext } from "../contexts/UserContextProvider";
import { ClipLoader } from "react-spinners";

function Home() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [pickedAnswers, setPickedAnswers] = useState<Answer[]>([]);
  const [saveTriggered, setSaveTriggered] = useState<boolean>(false);

  const quizData = useContext(QuizContext);
  const answerData = useContext(AnswerContext);
  const users = useContext(UserContext);

  const auth = getAuth();
  const db = getFirestore(app);

  useEffect(() => {
    const delay = 1000; // 1 second delay
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, delay);

    return () => clearTimeout(timeoutId); // Clear the timeout if the component unmounts
  }, []);

  const saveAnswers = async () => {
    try {
      const docRef = await addDoc(collection(db, "pickedAnswers"), {
        userPickedAnswers: pickedAnswers,
        userRef: `users/${auth.currentUser?.uid}`,
      });
      console.log("Document written with ID: ", docRef.id);
      countScore();
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  useEffect(() => {
    if (currentQuestionIndex === quizData?.questions.length && !saveTriggered) {
      setSaveTriggered(true);
      saveAnswers();
    }
  }, [currentQuestionIndex, quizData?.questions.length, saveTriggered]);

  if (!quizData || loading) {
    return (
      <ClipLoader
        loading={loading}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
        color="#fcc92d"
      />
    );
  }

  const handleAnswerClick = (option: string) => {
    const oldAnswers = pickedAnswers;
    const currentQuestionId = quizData.questions[currentQuestionIndex].uid;
    setPickedAnswers([
      ...oldAnswers,
      { correctAnswer: option, questionId: currentQuestionId },
    ]);
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    setSaveTriggered(false);
  };

  const countScore = () => {
    let newScore = 0;

    pickedAnswers.forEach((pickedAnswer) => {
      const matchingQuestion = answerData?.find((answer) =>
        answer.correctAnswers.find(
          (correctAnswer) =>
            correctAnswer.questionId === pickedAnswer.questionId
        )
      );

      if (
        matchingQuestion &&
        matchingQuestion.correctAnswers.some(
          (correctAnswer) =>
            correctAnswer.correctAnswer === pickedAnswer.correctAnswer
        )
      ) {
        newScore += 1;
      }
    });
    saveScore(newScore);
    console.log("poäng?", newScore);

    navigate("/correct-quiz");
  };

  const saveScore = async (theScore: number) => {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      return null;
    }
    const userRef = doc(db, "users", currentUser.uid);

    users?.forEach(async (user) => {
      if (user.uid === currentUser.uid) {
        try {
          const userDoc = await getDoc(userRef);
          const currentScore = userDoc.exists() ? userDoc.data().score : 0;
          await updateDoc(userRef, {
            score: currentScore + theScore,
          });
          console.log("Document updated with score ", userRef.id);
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      }
    });
  };

  return (
    <div>
      {quizData?.questions &&
      currentQuestionIndex < quizData.questions.length ? (
        <>
          <h1 className="question">
            {quizData.questions[currentQuestionIndex]?.text || ""}
          </h1>
          <div className="answer-container">
            {quizData.questions[currentQuestionIndex]?.options.map(
              (option, index) => (
                <AnswerButton
                  key={index}
                  option={option}
                  currentIndex={currentQuestionIndex}
                  onAnswerClick={handleAnswerClick}
                />
              )
            )}
          </div>
        </>
      ) : null}
    </div>
  );
}

export default Home;
