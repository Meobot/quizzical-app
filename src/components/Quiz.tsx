import React from "react";

function Quiz(props) {
	return (
		<div className="flex flex-col container">
			{props.quizData.map((question) => (
				<div
					key={question.question}
					className="border-b-2 border-quizBorderColor mb-5"
				>
					<h2 className="font-karla leading-5 text-xl">
						{question.question}
					</h2>
					<div className="space-x-6">
						{/* map over correct and incorrect answers and shuffle them, then display all answers */}
						{[
							...question.incorrect_answers,
							question.correct_answer,
						]
							.sort(() => Math.random() - 0.5)
							.map((answer) => (
								<button
									className="border-solid border-2 border-btnBorColor rounded-2xl min-w-1/2 py-2 px-5 my-5"
									key={answer}
								>
									{answer}
								</button>
							))}
					</div>
				</div>
			))}
			<div className="m-auto">
				<button className="bg-btnBorColor text-white rounded-2xl px-7 py-4">Check answers</button>
			</div>
		</div>
	);
}

export default Quiz;
