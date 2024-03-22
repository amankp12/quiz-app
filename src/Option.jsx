// src/Option.js
import React from 'react';

const Option = ({ option, selected, onOptionChange }) => {
  return (
    <div className="mb-2">
      <input
        type="radio"
        value={option}
        checked={selected === option}
        onChange={onOptionChange}
        className="mr-2"
      />
      <label>{option}</label>
    </div>
  );
};

export default Option;
