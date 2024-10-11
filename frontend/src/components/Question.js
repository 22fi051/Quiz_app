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
      <h2 className="text-2xl font-semibold mb-4">{question.question_text}</h2>
      <ul>
        {question.choices.map((choice) => (
          <li key={choice.id} className="mb-2">
            <button
              onClick={() => handleChoiceSelect(choice)}
              className={`w-full p-4 text-left border rounded ${
                selectedChoice?.id === choice.id ? 'bg-blue-100' : 'bg-white'
              }`}
            >
              {choice.choice_text}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}