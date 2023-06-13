import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import Question from "./Question";

interface QuizData {
	question: string;
	correct_answer: string;
	incorrect_answers: string[];
  }
  
  interface QuizProps {
	quizData: QuizData[];
	handleRestart: () => void;
  }

interface SelectedAnswers {
	[question: string]: string;
}

function Quiz({ quizData, handleRestart }: QuizProps) {
	const [selectedAnswers, setSelectedAnswers] = useState<SelectedAnswers>({});
	const [shuffledAnswers, setShuffledAnswers] = useState<
		{
			question: string;
			correct_answer: string;
			incorrect_answers: string[];
			answers: string[];
		}[]
	>([]);
	const [score, setScore] = useState<number>(0);
	const [gameEnd, setGameEnd] = useState<boolean>(false);

	// Shuffle the answers when the component mounts
	useEffect(() => {
		shuffleAnswers();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// Shuffle the answers so they're not always in the same order
	const shuffleAnswers = () => {
		const shuffled = quizData.map((question) => {
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
	const handleAnswerSelect = (question: string, answer: string) => {
		if (gameEnd) return;
		setSelectedAnswers({ ...selectedAnswers, [question]: answer });
	};

	// Check the answers and calculate the final score
	const checkAnswers = (e: React.FormEvent) => {
		e.preventDefault();

		const unansweredQuestions = quizData.filter(
			(question) => !selectedAnswers[question.question]
		);

		if (unansweredQuestions.length) {
			alert(
				`You have ${unansweredQuestions.length} unanswered questions. Please answer them before submitting.`
			);
			return;
		}

		calculateScore();
		setGameEnd(true);
	};

	// Calculate the final score
	const calculateScore = () => {
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
									<Question
										question={question}
										handleAnswerSelect={
											handleAnswerSelect
										}
										gameEnd={gameEnd}
										isSelectedAnswer={isSelectedAnswer}
										answer={answer}
										isCorrectAnswer={isCorrectAnswer}
										isIncorrectUserAnswer={
											isIncorrectUserAnswer
										}
										inputId={inputId}
									/>
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
					onClick={gameEnd ? handleRestart : checkAnswers}
				>
					{gameEnd ? "Play again" : "Check answers"}
				</button>
			</div>
		</form>
	);
}

export default Quiz;
