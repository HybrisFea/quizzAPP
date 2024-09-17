import React from "react";
import PropTypes from "prop-types";

const Question = ({
  questionData,
  handleChange,
  selectedOptions,
  questionNumber,
  maxSelections,
}) => {
  return (
    <div className='question-container'>
      <h2>
        {questionNumber + 1}. {questionData.question}
      </h2>
      <ul>
        {questionData.options.map((option, index) => (
          <li
            key={index}
            className={`option ${
              selectedOptions.includes(index) ? "selected" : ""
            }`}
            onClick={() => handleChange(index)}
            style={{
              pointerEvents:
                selectedOptions.length >= maxSelections &&
                !selectedOptions.includes(index)
                  ? "none"
                  : "auto",
            }}
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
};

Question.propTypes = {
  questionData: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  selectedOptions: PropTypes.array.isRequired,
  questionNumber: PropTypes.number.isRequired,
  maxSelections: PropTypes.number.isRequired,
};

export default Question;
