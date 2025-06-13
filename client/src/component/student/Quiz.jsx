import React, { useEffect, useState } from 'react';
import axios from "axios";
import "./Quiz.css";
import { useLocation } from 'react-router-dom';

const Quiz = () => {
	const [standard, setStandard] = useState(null);
	const [quizData, setQuizData] = useState([]);   // Store quiz data
	const [selectedAnswers, setSelectedAnswers] = useState({});  // User's selected answers
	const [checkedAnswers, setCheckedAnswers] = useState({});  // Store correct/incorrect status

	const query = new URLSearchParams(useLocation().search);
	const name = query.get("user");

	useEffect(() => {
		const loadQuiz = async () => {
			try {
				const userResponse = await axios.get("http://localhost:3000/check-user", { params: { username: name } });
				const userStandard = userResponse.data.detail.standard;
				setStandard(userStandard);
				
				axios.get("http://localhost:3000/api/quiz")
				.then(response => {
					const filteredData = response.data.find(quiz => quiz.standard === userStandard);
					setQuizData(filteredData ? filteredData.questions : []);
				})
				.catch(error => console.error("Error fetching quiz:", error));
			}
			catch {

			}
		}

		if (name) {
			loadQuiz();
		}
	}, []);

	// Handle option selection
	const handleSelect = (questionIndex, selectedOption) => {
		const correctAnswer = quizData[questionIndex].answer;
		const isCorrect = selectedOption === correctAnswer;

		setSelectedAnswers({
			...selectedAnswers,
			[questionIndex]: selectedOption
		});

		setCheckedAnswers({
			...checkedAnswers,
			[questionIndex]: isCorrect
		});
	};

	return (
		<div className="main-content">
			<div className="quiz-mega-container-box">
				<div className="quiz-list-box">
					<div className="quiz-container">
						{quizData.map((q, qIndex) => (
							<div key={qIndex} className="quiz-box">
								<div className="quiz-question">
									{qIndex + 1}. {q.question}
								</div>
								<div className="quiz-option-list-box">
									{q.options.map((option, optIndex) => (
										<div
											key={optIndex}
											className={`quiz-option-box 
											${selectedAnswers[qIndex] === option
													? checkedAnswers[qIndex] ? 'correct' : 'wrong'
													: ''
												}`}
											onClick={() => handleSelect(qIndex, option)}
										>
											{option}
										</div>
									))}
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Quiz;
