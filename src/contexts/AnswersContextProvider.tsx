import { PropsWithChildren, useEffect, useState } from "react";
import { AnswerResponse } from "../interfaces";
import React from "react";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import app from "../firebaseConfig";

export const AnswerContext = React.createContext<AnswerResponse[] | null>(null);

export const AnswerContextProvider = ({ children }: PropsWithChildren) => {
  const [AnswerData, setAnswerData] = useState<AnswerResponse[]>([]);

  const fetchData = async () => {
    const db = getFirestore(app);

    const answersCollection = collection(db, "answers");
    const answers = await getDocs(answersCollection);

    const newAnswersData: AnswerResponse[] = [];

    answers.docs.forEach((answer) => {
      const data = answer.data() as AnswerResponse;

      if (data) {
        newAnswersData.push(data);
      }
    });
    setAnswerData(newAnswersData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AnswerContext.Provider value={AnswerData}>
      {children}
    </AnswerContext.Provider>
  );
};
