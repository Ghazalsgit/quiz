import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./create-page.scss";
import { Answer, Question } from "../interfaces";
import {
  addDoc,
  collection,
  doc,
  getFirestore,
  updateDoc,
} from "firebase/firestore";
import app from "../firebaseConfig";
import QuestionForm from "../components/answer-button/question-form";
import { getAuth } from "firebase/auth";
import { UserContext } from "../contexts/UserContextProvider";

function CreatePage() {
  const [quizTitle, setQuizTitle] = useState<string>("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const users = useContext(UserContext);

  const navigate = useNavigate();

  const navigateBack = () => {
    navigate(-1);
  };

  const onChangeQuestion = (question: Question, index: number) => {
    const oldQuestions = questions;
    oldQuestions.splice(index, 1, question);

    setQuestions([...oldQuestions]);
  };

  const onChangeCorrectAnswer = (answer: Answer, index: number) => {
    const oldAnswers = answers;
    oldAnswers.splice(index, 1, answer);
    setAnswers([...oldAnswers]);
  };

  const generateRandomUid = () => {
    const randomNumbers: number[] = [];
    for (let i = 0; i < 8; i++) {
      randomNumbers.push(Math.floor(Math.random() * 10));
    }
    return randomNumbers.join("");
  };

  const saveQuiz = async () => {
    try {
      const newUid = generateRandomUid();
      const db = getFirestore(app);
      const docRef = await addDoc(collection(db, "quizzes"), {
        quizTitle,
        questions,
        uid: newUid,
      });
      const docReff = await addDoc(collection(db, "answers"), {
        "correct-answers": {
          correctAnswer: answers,
        },
        quiz: `quizzes/${docRef}`,
      });
      console.log("Document written with ID: ", docReff.id);

      updateUser(docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const updateUser = (ref: string) => {
    const auth = getAuth();
    const db = getFirestore(app);

    const currentUser = auth.currentUser;
    if (!currentUser) {
      return null;
    }
    const userRef = doc(db, "users", currentUser.uid);

    users?.forEach(async (user) => {
      if (user.uid === currentUser.uid) {
        try {
          const idsArray: string[] = [];
          idsArray.push(ref);
          await updateDoc(userRef, {
            createdQuizIds: idsArray,
          });
          console.log("Document updated with score ", userRef.id);
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      }
    });
  };

  return (
    <div className="create-quiz">
      <div className="back-button" onClick={navigateBack}>
        <p>Back</p>
      </div>
      <label>
        Quiz Title:
        <input
          type="text"
          value={quizTitle}
          onChange={(e) => setQuizTitle(e.target.value)}
        />
      </label>
      {questions.map((question, index) => (
        <QuestionForm
          key={index}
          question={question}
          correctAnswer={answers[index]?.correctAnswer}
          onChange={(question) => onChangeQuestion(question, index)}
          onChangeCorrectAnswer={(answer) =>
            onChangeCorrectAnswer(answer, index)
          }
        />
      ))}
      <button
        className="form-button"
        onClick={() =>
          setQuestions([...questions, { options: [""], text: "", uid: "" }])
        }
      >
        + Add question
      </button>

      <button type="button" onClick={saveQuiz}>
        Complete Quiz
      </button>
    </div>
  );
}

export default CreatePage;
