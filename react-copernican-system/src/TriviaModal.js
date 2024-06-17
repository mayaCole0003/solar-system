import React, { useState, useEffect } from 'react';
import {
	questionsMap,
	earthQuestions,
	jupiterQuestions,
	marsQuestions,
	mercuryQuestions,
	saturnQuestions,
	venusQuestions,
	uranusQuestions,
	neptuneQuestions,
} from './questions';
import './TriviaModal.css';

const TriviaModal = ({ isVisible, closeModal, triviaType }) => {
	const [questions, setQuestions] = useState([]);
	const [score, setScore] = useState(0);
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [answeredQuestions, setAnsweredQuestions] = useState(0);
	const [selectedOption, setSelectedOption] = useState(null);
	const [answerSelected, setAnswerSelected] = useState(false);
	// Define the questions for different trivia types
	useEffect(() => {
		const setQuestionsByType = () => {
			switch (triviaType) {
				case 'Mercury':
					setQuestions(mercuryQuestions);
					break;
				case 'Venus':
					setQuestions(venusQuestions);
					break;
				case 'Earth':
					setQuestions(earthQuestions);
					break;
				case 'Mars':
					setQuestions(marsQuestions);
					break;
				case 'Jupiter':
					setQuestions(jupiterQuestions);
					break;
				case 'Saturn':
					setQuestions(saturnQuestions);
					break;
				case 'Uranus':
					setQuestions(uranusQuestions);
					break;
				case 'Neptune':
					setQuestions(neptuneQuestions);
					break;

				default:
					setQuestions([]);
					break;
			}
		};
		setQuestionsByType();
	}, [triviaType]);

	const handleAnswer = (selected, correctOption) => {
		// setSelectedOption(selectedOption);
		// const isCorrect = selectedOption === correctOption;
		// setIsOptionCorrect(isCorrect);

		// if (selectedOption === correctOption) {
		// 	setScore(score + 1);
		// }
		setAnswerSelected(true);
		setSelectedOption(selected); // Track the selected option
		const isCorrect = selected === correctOption;

		if (isCorrect) {
			setScore(score + 1); // Increase score if correct
		}
		setAnsweredQuestions(answeredQuestions + 1);
		// Move to the next question
		setCurrentQuestion(currentQuestion + 1);
	};

	const finishTrivia = () => {
		closeModal();
		setAnsweredQuestions(0); // Reset answered questions for next time
		setCurrentQuestion(0); // Reset current question index
		setScore(0); // Reset score
	};

	const currentQues = questionsMap[triviaType][currentQuestion];

	return (
		<div
			className='modal-container'
			style={{ display: isVisible ? 'flex' : 'none' }}
		>
			<div className='modal-content-container'>
				<div style={{ width: '90%' }}>
					<p className='currGrade'>
						<span className='score'>Score: {score} / 3</span>
						Question: {currentQuestion} / 3
					</p>

					{currentQues && currentQues.question && (
						<h3 className='current-question'>
							{currentQues.question}
						</h3>
					)}
					<div class='game-options-container'>
						{currentQues &&
							currentQues.options &&
							currentQues.options.map((option, optionIndex) => (
								<button
									key={optionIndex}
									onClick={() =>
										handleAnswer(
											option.charAt(0),
											currentQues.correctOption
										)
									}
									className={
										'option ' +
										(answerSelected
											? option.charAt(0) ===
											  currentQues.correctOption
												? 'correct'
												: option.charAt(0) ===
												  selectedOption
												? 'wrong'
												: ''
											: '')
									}
								>
									{option}
								</button>
							))}
					</div>
					{answeredQuestions === questions.length && (
						<div class='currGrade'>
							<div className='modal-button-container'>
								<button onClick={finishTrivia}>Finish</button>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default TriviaModal;
