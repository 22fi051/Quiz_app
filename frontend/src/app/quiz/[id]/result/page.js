'use client';

import { useState, useEffect } from "react";

export default function ResultPage({ params }) {
  const { id } = params;
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);

  useEffect(() => {
    const answers = JSON.parse(sessionStorage.getItem(`quiz_${id}_answers`)) || [];
    const correctAnswers = answers.filter((answer) => answer.is_correct).length;

    setScore(correctAnswers);
    setTotalQuestions(answers.length);
  }, [id]);

  return (
    <div className="container mx-auto p-4 text-center">
      <h1 className="text-3xl font-bold mb-4">結果発表</h1>
      <p className="text-xl mb-6">
        {totalQuestions}問中 {score}問正解しました！
      </p>
      <button
        onClick={() => window.location.replace(`/quiz/${id}`)}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        もう一度プレイ
      </button>
    </div>
  );
}