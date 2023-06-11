import { useState } from "react";
import { decode } from "html-entities";
import Start from "./components/Start";
import Quiz from "./components/Quiz";

function App() {
	const [gameStart, setGameStart] = useState(false);
	const [formData, setFormData] = useState({
		numOfQuestions: "5",
		category: "",
		difficulty: "",
		type: "",
	});
	const [quizData, setQuizData] = useState([]);

	// Fetch quiz data from the API
	async function getQuizData(formData) {
		const url = `https://opentdb.com/api.php?amount=${formData.numOfQuestions}&category=${formData.category}&difficulty=${formData.difficulty}&type=${formData.type}`;

		const response = await fetch(url);
		const data = await response.json();

		if (data) {
			// Decode the HTML entities in the question and answer options
			const decodedData = data.results.map((question: any) => {
				question.question = decode(question.question);
				question.correct_answer = decode(question.correct_answer);
				question.incorrect_answers = question.incorrect_answers.map(
					(answer: string) => decode(answer)
				);
				return question;
			});

			setGameStart(true);
			setQuizData(decodedData);
		} else {
			alert(
				"There was an error fetching your quiz data. Please try again."
			);
		}
	}

	// Update the form data when the user selects a new option
	function handleFormChange(e) {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	}

	return (
		<main className="min-h-screen bg-backgroundColor flex items-center justify-center">
			<div className="flex justify-center items-center">
				{gameStart ? (
					<Quiz quizData={quizData} />
				) : (
					<Start
						handleFormChange={handleFormChange}
						setGameStart={() => getQuizData(formData)}
					/>
				)}
			</div>
		</main>
	);
}

export default App;
