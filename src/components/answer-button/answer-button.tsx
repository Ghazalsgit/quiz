import React from "react";
import "./answer-button.scss";

interface AnswerButtonProps {
  option: string; // Adjust the type according to your data structure
  currentIndex: number;
  onAnswerClick: (option: string) => void; // Modify the function signature
}

const AnswerButton = ({
  option,
  currentIndex,
  onAnswerClick,
}: AnswerButtonProps) => {
  return (
    <div>
      <button className="answer-box" onClick={() => onAnswerClick(option)}>
        {option}
      </button>
    </div>
  );
};

export default AnswerButton;
