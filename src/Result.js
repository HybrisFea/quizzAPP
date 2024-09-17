import React from "react";
import PropTypes from "prop-types";

const Result = ({ score, totalQuestions }) => {
  return (
    <div>
      <h2>Your score: {((score / totalQuestions) * 100).toFixed(2)}%</h2>
    </div>
  );
};

Result.propTypes = {
  score: PropTypes.number.isRequired,
  totalQuestions: PropTypes.number.isRequired,
};

export default Result;
