import { PropsWithChildren, useEffect, useState } from "react";
import { Quiz } from "../interfaces";
import React from "react";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import app from "../firebaseConfig";

export const QuizContext = React.createContext<Quiz | null>(null);

export const QuizContextProvider = ({ children }: PropsWithChildren) => {
  const [quizData, setQuizData] = useState<Quiz>({
    questions: [],
    uid: "",
    quizTitle: "",
  });

  const fetchData = async () => {
    const db = getFirestore(app);

    const quizCollection = collection(db, "quizzes");
    const quizzes = await getDocs(quizCollection);
    const newQuizData: Quiz = {
      questions: [],
      uid: "",
      quizTitle: "",
    };
    quizzes.docs.forEach((quiz) => {
      const data = quiz.data() as Quiz;

      if (data.questions) {
        newQuizData.questions.push(...data.questions);
      }
    });
    setQuizData(newQuizData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <QuizContext.Provider value={quizData}> {children} </QuizContext.Provider>
  );
};
