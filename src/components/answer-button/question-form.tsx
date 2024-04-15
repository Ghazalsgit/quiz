import React, { useEffect, useState } from "react";
import "./question-form.scss";
import { Answer, Question } from "../../interfaces";

interface QuestionFormProps {
  onChange: (question: Question) => void;
  onChangeCorrectAnswer: (answer: Answer) => void;
  question: Question;
  correctAnswer: string;
}

function QuestionForm({
  onChange,
  onChangeCorrectAnswer,
  question,
}: QuestionFormProps) {
  const handleOptionChange = (index: number, value: string) => {
    const updatedOptions = [...question.options];
    updatedOptions[index] = value;
    const newUid = generateRandomUid();

    onChange({ ...question, options: updatedOptions, uid: newUid });
  };

  const addAnotherOption = () => {
    console.log([...question.options, ""]);

    onChange({ ...question, options: [...question.options, ""] });
  };

  const generateRandomUid = () => {
    const randomNumbers: number[] = [];
    for (let i = 0; i < 8; i++) {
      randomNumbers.push(Math.floor(Math.random() * 10));
    }
    return randomNumbers.join("");
  };

  const handleChangeQuestionText = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    console.log(event.target.value);

    onChange({ ...question, text: event.target.value });
  };

  // const handleChangeQuestionScore = (
  //   event: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   const scoreValue = parseInt(event.target.value, 10);

  //   if (!isNaN(scoreValue)) {
  //     onChange({ ...question, score: scoreValue });
  //   } else {
  //     alert("not a number");
  //   }
  // };
  const handleChangeCorrectAnswer = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    onChangeCorrectAnswer({
      correctAnswer: event.target.value,
      questionId: question.uid,
    });
  };

  return (
    <div className="create-quiz">
      <form>
        <label>
          Question Text:
          <input
            type="text"
            onChange={handleChangeQuestionText}
            value={question.text}
          />
        </label>

        {question.options.map((option, index) => (
          <label key={index}>
            Answer Option {index + 1}:
            <input
              type="text"
              onChange={(e) => handleOptionChange(index, e.target.value)}
              value={option}
            />
          </label>
        ))}
        <button
          type="button"
          className="form-button"
          onClick={addAnotherOption}
        >
          + Add option
        </button>

        <label>
          Correct Answer:
          <select
            onChange={handleChangeCorrectAnswer}
            defaultValue={question.options[0]}
          >
            {question.options.map((option, index) => (
              <option key={index} value={option}>
                {`Option ${index + 1}`}
              </option>
            ))}
          </select>
        </label>
      </form>
    </div>
  );
}

export default QuestionForm;
