interface QuestionProps {
	question: {
		question: string;
		correct_answer: string;
		incorrect_answers: string[];
	};
	handleAnswerSelect: (question: string, answer: string) => void;
	gameEnd: boolean;
	isSelectedAnswer: boolean;
	answer: string;
	isCorrectAnswer: boolean;
	isIncorrectUserAnswer: boolean;
	inputId: string;
}

function Question({
	question,
	handleAnswerSelect,
	gameEnd,
	isSelectedAnswer,
	answer,
	isCorrectAnswer,
	isIncorrectUserAnswer,
	inputId,
}: QuestionProps) {
	return (
		<div>
			<input
				type="radio"
				id={inputId}
				name={question.question}
				value={answer}
				onChange={() => handleAnswerSelect(question.question, answer)}
				checked={isSelectedAnswer}
			/>
			<label
				htmlFor={inputId}
				className={`border-solid border-2 border-btnBorColor rounded-2xl min-w-1/2 py-2 px-5 ${
					gameEnd && isCorrectAnswer
						? "bg-correctAnswer border-none"
						: gameEnd && isIncorrectUserAnswer
						? "bg-incorrectAnswer border-none"
						: gameEnd === false && isSelectedAnswer
						? "bg-selectedAnswer border-none"
						: ""
				}`}
			>
				{answer}
			</label>
		</div>
	);
}

export default Question;
