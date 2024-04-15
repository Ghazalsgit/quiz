import { PropsWithChildren, useEffect, useState } from "react";
import { UserAnswerResponse } from "../interfaces";
import React from "react";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import app from "../firebaseConfig";
import { getAuth } from "firebase/auth";

export const PickedAnswerContext =
  React.createContext<UserAnswerResponse | null>(null);

export const PickedAnswerContextProvider = ({
  children,
}: PropsWithChildren) => {
  const [AnswerData, setAnswerData] = useState<UserAnswerResponse>({
    userPickedAnswers: [
      {
        questionId: "",
        correctAnswer: "",
      },
    ],
    userRef: "",
  });
  const auth = getAuth();

  const fetchData = async () => {
    const db = getFirestore(app);

    const answersCollection = collection(db, "pickedAnswers");
    const answers = await getDocs(answersCollection);

    let newAnswersData: UserAnswerResponse = {
      userPickedAnswers: [
        {
          questionId: "",
          correctAnswer: "",
        },
      ],
      userRef: "",
    };

    answers.docs.forEach((answer) => {
      const data = answer.data() as UserAnswerResponse;
      console.log("PICKED ANSWERS", data);

      if (data.userRef === `users/${auth.currentUser?.uid}`) {
        newAnswersData = data;
      }
    });
    setAnswerData(newAnswersData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <PickedAnswerContext.Provider value={AnswerData}>
      {children}
    </PickedAnswerContext.Provider>
  );
};
