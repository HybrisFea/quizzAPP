// src/FileUpload.js
import React, { useState } from "react";

const FileUpload = ({ onFileUpload }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileRead = () => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const quizData = JSON.parse(e.target.result);
        onFileUpload(quizData);
      } catch (err) {
        setError("Invalid file format. Please upload a valid JSON file.");
      }
    };
    reader.readAsText(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (file) {
      handleFileRead();
    } else {
      setError("Please select a file to upload.");
    }
  };

  return (
    <div className='file-upload-container'>
      <form onSubmit={handleSubmit}>
        <input type='file' onChange={handleFileChange} accept='.json' />
        <button type='submit'>Upload file</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
};

export default FileUpload;
