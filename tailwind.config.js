/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		fontFamily: {
			inter: ["Inter", "sans-serif"],
			karla: ["Karla", "sans-serif"],
		},
		extend: {
			colors: {
				backgroundColor: "#F5F7FB",
				btnBorColor: "#4D5B9E",
				quizBorderColor: "#DBDEF0",
				selectedAnswer: "#d6dbf5",
				correctAnswer: "#94D7A2",
				incorrectAnswer: "#F8BCBC"
			},
		},
	},
	plugins: [],
};
