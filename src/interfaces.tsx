export interface User {
  displayName: string;
  uid: string;
  score: number;
  createdQuizIds?: string[];
}

export interface Quiz {
  quizTitle?: string;
  questions: Question[];
  uid: string;
}

export interface Question {
  text: string;
  options: string[];
  uid: string;
}
export interface Answer {
  correctAnswer: string;
  questionId: string;
}

export interface AnswerResponse {
  correctAnswers: [
    {
      correctAnswer: string;
      questionId: string;
    }
  ];
}
export interface UserAnswerResponse {
  userPickedAnswers: [
    {
      correctAnswer: string;
      questionId: string;
    }
  ];
  userRef: string;
}
