'use client';

import { useState } from "react";

export default function Question({ question, onAnswer }) {
  const [selectedChoice, setSelectedChoice] = useState(null);

  const handleChoiceSelect = (choice) => {
    setSelectedChoice(choice);
    onAnswer(choice);
  }

  return (
    <div>
      <div className="h-96 bg-white p-8 rounded-lg text-center text-black shadow-lg flex items-center justify-center">
        <h2 className="text-2xl font-semibold mb-4">{question.question_text}</h2>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-6">
        {question.choices.map((choice) => (
          <button
            key={choice.id}
            onClick={() => handleChoiceSelect(choice)}
            className={`p-4 text-center border rounded hover:scale-105 ${
              selectedChoice?.id === choice.id ? 'bg-indigo-200' : 'bg-white'
            }`}
          >
            {choice.choice_text}
          </button>
        ))}
      </div>
    </div>
  );
}