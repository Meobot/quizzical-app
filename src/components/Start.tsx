import React from "react";
import { categoryOptions } from "../data/categoryOptions.ts";

function Start(props) {

	const handleBtnClick = (e) => {
		e.preventDefault();
		props.setGameStart(true);
	};

	return (
		<div className="flex flex-col space-y-5 bg-sky-300 p-7 rounded-2xl items-center">
			<h1 className="font-bold text-3xl">Quizzical</h1>
			<form className="flex flex-col space-y-7">
				<div className="flex flex-col space-y-2">
					<label htmlFor="category">Category</label>
					<select name="category" id="category" onChange={props.handleFormChange}>
						<option value="any">Any</option>
						{categoryOptions.map((category) => (
							<option key={category.id} value={category.id}>
								{category.name}
							</option>
						))}
					</select>
					<label htmlFor="difficulty">Difficulty</label>
					<select name="difficulty" id="difficulty" onChange={props.handleFormChange}>
						<option value="any">Any</option>
						<option value="easy">Easy</option>
						<option value="medium">Medium</option>
						<option value="hard">Hard</option>
					</select>
					<label htmlFor="type">Type</label>
					<select name="type" id="type" onChange={props.handleFormChange}>
						<option value="any">Any</option>
						<option value="multiple">Multiple Choice</option>
						<option value="boolean">True / False</option>
					</select>
				</div>
				<button className="bg-btnBorColor text-white rounded-2xl py-5" onClick={handleBtnClick}>Start Quiz</button>
			</form>
		</div>
	);
}

export default Start;