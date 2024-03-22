// src/Question.js
import React from 'react';
import Option from './Option';

const Question = ({ question, options, selected, onOptionChange }) => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">{question}</h2>
      {options.map((option, index) => (
        <Option
          key={index}
          option={option}
          selected={selected}
          onOptionChange={onOptionChange}
        />
      ))}
    </div>
  );
};

export default Question;
