'use client';

import { useEffect, useState } from "react";

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
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4">結果</h1>
        <p className="text-4xl mt-12 mb-12">
          {totalQuestions}問中 {score}問正解しました！
        </p>
        <button
          onClick={() => window.location.replace(`/quiz/${id}`)}
          className="px-6 py-3 border border-indigo-700 text-indigo-700 font-semibold rounded hover:bg-indigo-700 hover:text-white transition"
        >
          もう一度プレイ
        </button>
        <button
          onClick={() => window.location.replace(`/quiz`)}
          className="px-6 py-3 border border-indigo-700 text-indigo-700 font-semibold rounded hover:bg-indigo-700 hover:text-white transition"
        >
          問題一覧へ
        </button>
      </div>
    </div>
  );
}