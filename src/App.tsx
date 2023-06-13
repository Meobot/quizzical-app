import { useState } from "react";
import { decode } from "html-entities";
import Start from "./components/Start";
import Quiz from "./components/Quiz";

interface FormData {
	numOfQuestions: string;
	category: string;
	difficulty: string;
	type: string;
}

interface QuizQuestion {
	question: string;
	correct_answer: string;
	incorrect_answers: string[];
}

function App() {
	const [gameStart, setGameStart] = useState<boolean>(false);
	const [formData, setFormData] = useState<FormData>({
		numOfQuestions: "5",
		category: "",
		difficulty: "",
		type: "",
	});
	const [quizData, setQuizData] = useState<QuizQuestion[]>([]);

	// Fetch quiz data from the API
	async function getQuizData(formData: FormData) {
		const url = `https://opentdb.com/api.php?amount=${formData.numOfQuestions}&category=${formData.category}&difficulty=${formData.difficulty}&type=${formData.type}`;

		const response = await fetch(url);
		const data = await response.json();

		if (data) {
			// Decode the HTML entities in the question and answer options
			const decodedData = data.results.map((question: QuizQuestion) => {
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
			alert("There was an error fetching your quiz data. Please try again.");
		}
	}

	// Update the form data when the user selects a new option
	const handleFormChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

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
