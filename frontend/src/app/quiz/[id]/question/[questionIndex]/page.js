'use client';

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Question from "../../../../../components/Question";

export default function QuestionPage({ params }) {
  const { id, questionIndex } = params;
  const router = useRouter();

  const [quizData, setQuizData] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  // const [answeredQuestions, setAnsweredQuestions] = useState([]);

  useEffect(() => {
    const fetchQuizData = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/quiz/${id}/`);
      if (!res.ok) {
        throw new Error("APIエラーが発生しました");
      }
      const quiz = await res.json();

      //quiz.questions = quiz.questions.sort(() => Math.random() - 0.5);

      setQuizData(quiz);
      setCurrentQuestion(quiz.questions[questionIndex]);
    };

    fetchQuizData();
  }, [id, questionIndex]);

  const handleAnswer = (choice) => {
    const isCorrect = choice.is_correct;

    const answer = {
      question_id: currentQuestion.id,
      selected_choice_id: choice.id,
      is_correct: isCorrect,
    };

    const storedAnswers = JSON.parse(sessionStorage.getItem(`quiz_${id}_answers`)) || [];
    sessionStorage.setItem(`quiz_${id}_answers`, JSON.stringify([...storedAnswers, answer]));

    const nextQuestionIndex = parseInt(questionIndex) + 1;

    if (nextQuestionIndex < quizData.questions.length) {
      router.push(`/quiz/${id}/question/${nextQuestionIndex}`);
    } else {
      router.push(`/quiz/${id}/result`);
    }
  };

  if (!currentQuestion) {
    return <div className="w-24 h-24 border-4 border-dashed rounded-full animate-spin border-white"></div>;
  }

  return (
    <div className="container mx-auto p-4">
      <Question question={currentQuestion} onAnswer={handleAnswer} />
    </div>
  );
}
