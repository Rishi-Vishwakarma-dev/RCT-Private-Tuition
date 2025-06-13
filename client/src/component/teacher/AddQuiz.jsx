import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import "./AddQuiz.css"
import axios from 'axios';

const AddQuiz = () => {

  const [username, setUsername] = useState(null);
  const [standard, setStandard] = useState(null);

  const [quizList, setQuizList] = useState([]);
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState('');

  const query = new URLSearchParams(useLocation().search);
  const name = query.get("user");

  useEffect(() => {
    const getUser = async () => {
      const response = await axios.get("http://localhost:3000/check-user", { params: { username: name } })

      const username = response.data.username;
      const standard = response.data.detail.standard;
      setUsername(username);
      setStandard(standard);
    }
    getUser();
  }, [name]);


  // Fetch Quiz List for Selected Standard
  useEffect(() => {
    fetchQuiz();
  }, [standard]);

  const fetchQuiz = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/get-quiz/${standard}`);
      setQuizList(response.data.questions || []);
    } catch (error) {
      setQuizList([]); // Reset if no quiz found
    }
  };

  // Handle Option Change
  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!question || options.some(opt => opt === "") || !correctAnswer) {
      alert("Please fill in all fields");
      return;
    }

    const newQuiz = {
      question,
      options,
      answer: correctAnswer,
      standard: parseInt(standard),
    };

    try {
      await axios.post("http://localhost:3000/add-quiz", newQuiz);
      alert("Quiz updated successfully!");
      setQuestion("");
      setOptions(["", "", "", ""]);
      setCorrectAnswer("");
      fetchQuiz(); // Refresh quiz list after adding
    } catch (error) {
      alert("Failed to add quiz");
    }
  };

  return (
    <>
      <div className="main-content">
        <div className="teacher-add-quiz-mega-container">
          <div className="add-quiz-header-panel">
            <div className="add-quiz-label">
              Manage Quiz for Standard {standard}
            </div>
          </div>
          <div className="add-quiz-body">
            <div className="quiz-add-section">
              <div className="quiz-select-standard">
                <div className="quiz-label-text">
                  Select Standard:
                </div>
                <select className='quiz-select-list-box' value={standard} onChange={(e) => setStandard(e.target.value)}>
                  <option className='quiz-select-list' value="-">Select Standard</option>
                  <option className='quiz-select-list' value="1">Standard 1</option>
                  <option className='quiz-select-list' value="2">Standard 2</option>
                  <option className='quiz-select-list' value="3">Standard 3</option>
                  <option className='quiz-select-list' value="4">Standard 4</option>
                  <option className='quiz-select-list' value="5">Standard 5</option>
                  <option className='quiz-select-list' value="6">Standard 6</option>
                  <option className='quiz-select-list' value="7">Standard 7</option>
                  <option className='quiz-select-list' value="8">Standard 8</option>
                  <option className='quiz-select-list' value="9">Standard 9</option>
                  <option className='quiz-select-list' value="10">Standard 10</option>
                  <option className='quiz-select-list' value="11">Standard 11</option>
                  <option className='quiz-select-list' value="12">Standard 12</option>
                </select>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="quiz-label-text">
                  Add a New Question
                </div>
                <div className='quiz-input-label' >Question:</div>
                <input type="text" className='quiz-question-input' value={question} onChange={(e) => setQuestion(e.target.value)} required />
                {
                  options.map((opt, index) => (
                    <div key={index}>
                      <div className='quiz-input-label' >Option {index + 1}:</div>
                      <input type="text" className='quiz-option-input' value={opt} onChange={(e) => handleOptionChange(index, e.target.value)} required />
                    </div>
                  ))
                }
                <div className="quiz-label-text">
                  Correct Answer:
                </div>
                <select className='quiz-select-list-box' value={correctAnswer} onChange={(e) => setCorrectAnswer(e.target.value)} required>
                  <option className='quiz-select-list' value="">Select Correct Answer</option>
                  {
                    options.map((opt, index) => (
                      <option className='quiz-select-list' key={index} value={opt}>{opt}</option>
                    ))
                  }
                </select>
                <button type='submit' className="quiz-submit-button" >
                  Submit
                </button>
              </form>
            </div>

            <div className="quiz-display-section">
              <div className="quiz-label-text">
                Existing Questions:
              </div>
              {quizList.length > 0 ? (
                <ul className="quiz-display-question-list">
                  {quizList.map((quiz, index) => (
                    <li className='quiz-question-display-box' key={index}>
                      <strong>{quiz.question}</strong>
                      <ul>
                        {quiz.options.map((opt, i) => (
                          <li key={i} className='quiz-display-option'>{opt}</li>
                        ))}
                      </ul>
                      <p className='quiz-display-answer'><strong>Answer:</strong> {quiz.answer}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No quiz found for this standard.</p>
              )}
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default AddQuiz
