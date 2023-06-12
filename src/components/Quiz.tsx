import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";

function Quiz(props) {
	const [selectedAnswers, setSelectedAnswers] = useState({});
	const [shuffledAnswers, setShuffledAnswers] = useState([]);
	const [score, setScore] = useState(0);
	const [gameEnd, setGameEnd] = useState(false);

	// Shuffle the answers when the component mounts
	useEffect(() => {
		shuffleAnswers();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// Shuffle the answers so they're not always in the same order
	const shuffleAnswers = () => {
		const shuffled = props.quizData.map((question) => {
			const answers = [
				...question.incorrect_answers,
				question.correct_answer,
			];
			return {
				...question,
				answers: answers.sort(() => Math.random() - 0.5),
			};
		});

		setShuffledAnswers(shuffled);
	};

	// Update the selected answers object when the user selects an answer
	const handleAnswerSelect = (question, answer) => {
		setSelectedAnswers((prevAnswers) => ({
			...prevAnswers,
			[question]: answer,
		}));
	};

	// Check the answers and calculate the final score
	const checkAnswers = (e) => {
		e.preventDefault();
		const { quizData } = props;
		const correctAnswers = quizData.map(
			(question) => question.correct_answer
		);
		let userScore = 0;

		for (let i = 0; i < quizData.length; i++) {
			if (selectedAnswers[quizData[i].question] === correctAnswers[i]) {
				userScore++;
			}
		}

		setScore(userScore);
		setGameEnd(true);
	};

	return (
		<form className="flex flex-col container p-8">
			{shuffledAnswers.map((question) => (
				<div
					key={question.question}
					className="border-b-2 border-quizBorderColor mb-5"
				>
					<h2 className="font-karla leading-5 text-xl">
						{question.question}
					</h2>
					<div className="flex flex-wrap space-x-6">
						{question.answers.map((answer) => {
							const inputId = nanoid();
							const isCorrectAnswer =
								answer === question.correct_answer;
							const isSelectedAnswer =
								selectedAnswers[question.question] === answer;
							const isIncorrectUserAnswer =
								isSelectedAnswer && !isCorrectAnswer;

							return (
								<div key={answer} className="my-6">
									<input
										type="radio"
										id={inputId}
										name={question.question}
										value={answer}
										onChange={() =>
											handleAnswerSelect(
												question.question,
												answer
											)
										}
										checked={isSelectedAnswer}
									/>
									<label
										htmlFor={inputId}
										className={`border-solid border-2 border-btnBorColor rounded-2xl min-w-1/2 py-2 px-5 ${
											gameEnd && isCorrectAnswer
												? "bg-green-500 text-white"
												: gameEnd &&
												  isIncorrectUserAnswer
												? "bg-red-500 text-white"
												: gameEnd === false && isSelectedAnswer ? "bg-selectedAnswer text-white" : ""
										}`}
									>
										{answer}
									</label>
								</div>
							);
						})}
					</div>
				</div>
			))}
			<div className="flex justify-center items-center  space-x-14">
				{gameEnd && (
					<h3 className="font-bold">
						You scored {score}/5 correct answers
					</h3>
				)}
				<button
					className="bg-btnBorColor text-white rounded-2xl px-7 py-4"
					onClick={gameEnd ? props.playAgain : checkAnswers}
				>
					{gameEnd ? "Play again" : "Check answers"}
				</button>
			</div>
		</form>
	);
}

export default Quiz;
