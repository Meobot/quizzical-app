import React, { useState } from "react";

function Quiz(props) {

	const correctAnswers = props.quizData.map((question) => question.correct_answer);
	console.log("🚀 ~ file: Quiz.tsx:6 ~ Quiz ~ correctAnswers:", correctAnswers)

	return (
		<form className="flex flex-col container p-8">
			{props.quizData.map((question) => (
				<div
					key={question.question}
					className="border-b-2 border-quizBorderColor mb-5"
				>
					<h2 className="font-karla leading-5 text-xl">
						{question.question}
					</h2>
					<div className="flex flex-wrap space-x-6">
						{[
							...question.incorrect_answers,
							question.correct_answer,
						]
							.sort(() => Math.random() - 0.5)
							.map((answer) => (
								<div 
								key={answer}
								className="my-6"
								>
									<input
										type={props.type === "multiple" ? "checkbox" : "radio"}
										id={answer}
										name={question.question}
										value={answer}
									/>
									<label
										htmlFor={answer}
										className="border-solid border-2 border-btnBorColor rounded-2xl min-w-1/2 py-2 px-5"
									>
										{answer}
									</label>
								</div>
							))}
					</div>
				</div>
			))}
			<div className="m-auto">
				<button className="bg-btnBorColor text-white rounded-2xl px-7 py-4">
					Check answers
				</button>
			</div>
		</form>
	);
}

export default Quiz;
