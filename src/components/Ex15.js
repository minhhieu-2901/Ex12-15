import { useReducer } from "react";

export function counterReducer(state, action) {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    case "RESET":
      return 0;
    default:
      return state;
  }
}

export function Counter() {
  const [count, dispatch] = useReducer(counterReducer, 0);

  return (
    <section
      aria-labelledby="counter-heading"
      className="ex15-panel counter-panel"
    >
      <div className="ex15-panel-heading">
        <span className="ex15-kicker">Exercise 1</span>
        <h2 id="counter-heading">Reducer counter</h2>
      </div>
      <output aria-label="Counter value" className="counter-output">
        {count}
      </output>
      <div className="counter-actions">
        <button
          aria-label="Decrement"
          className="counter-step-button"
          onClick={() => dispatch({ type: "DECREMENT" })}
          type="button"
        >
          −
        </button>
        <button
          className="counter-reset-button"
          onClick={() => dispatch({ type: "RESET" })}
          type="button"
        >
          Reset
        </button>
        <button
          aria-label="Increment"
          className="counter-step-button"
          onClick={() => dispatch({ type: "INCREMENT" })}
          type="button"
        >
          +
        </button>
      </div>
    </section>
  );
}

export const initialState = {
  questions: [
    {
      id: 1,
      question: "What is the capital of Australia?",
      options: ["Sydney", "Canberra", "Melbourne", "Perth"],
      answer: "Canberra",
    },
    {
      id: 2,
      question: "Which planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Jupiter", "Saturn"],
      answer: "Mars",
    },
  ],
  currentQuestion: 0,
  selectedOption: "",
  score: 0,
  showScore: false,
};

export function questionBankReducer(state, action) {
  switch (action.type) {
    case "SELECT_OPTION":
      return state.showScore
        ? state
        : { ...state, selectedOption: action.payload };
    case "NEXT_QUESTION": {
      if (!state.selectedOption || state.showScore) return state;

      const currentQuestion = state.questions[state.currentQuestion];
      const score =
        state.score + (state.selectedOption === currentQuestion.answer ? 1 : 0);
      const isLastQuestion =
        state.currentQuestion === state.questions.length - 1;

      return {
        ...state,
        currentQuestion: isLastQuestion
          ? state.currentQuestion
          : state.currentQuestion + 1,
        selectedOption: "",
        score,
        showScore: isLastQuestion,
      };
    }
    case "RESTART_QUIZ":
      return {
        ...initialState,
        questions: state.questions,
      };
    default:
      return state;
  }
}

export function QuestionBank() {
  const [state, dispatch] = useReducer(questionBankReducer, initialState);
  const question = state.questions[state.currentQuestion];

  if (state.showScore) {
    return (
      <section
        aria-labelledby="quiz-results-heading"
        className="ex15-panel quiz-panel"
      >
        <span className="ex15-kicker">Exercise 2</span>
        <h2 id="quiz-results-heading">Quiz complete</h2>
        <p className="quiz-score">
          Your Score: {state.score} / {state.questions.length}
        </p>
        <button
          className="quiz-next-button"
          onClick={() => dispatch({ type: "RESTART_QUIZ" })}
          type="button"
        >
          Restart quiz
        </button>
      </section>
    );
  }

  return (
    <section aria-labelledby="quiz-question" className="ex15-panel quiz-panel">
      <div className="quiz-progress">
        <span className="ex15-kicker">Exercise 2</span>
        <span>
          Question {state.currentQuestion + 1} of {state.questions.length}
        </span>
      </div>
      <h2 id="quiz-question">{question.question}</h2>
      <div aria-label="Answer options" className="quiz-options" role="group">
        {question.options.map((option) => (
          <button
            aria-pressed={state.selectedOption === option}
            className={`quiz-option${state.selectedOption === option ? " is-selected" : ""}`}
            key={option}
            onClick={() => dispatch({ type: "SELECT_OPTION", payload: option })}
            type="button"
          >
            {option}
          </button>
        ))}
      </div>
      <button
        className="quiz-next-button"
        disabled={!state.selectedOption}
        onClick={() => dispatch({ type: "NEXT_QUESTION" })}
        type="button"
      >
        {state.currentQuestion === state.questions.length - 1
          ? "Finish quiz"
          : "Next"}
      </button>
    </section>
  );
}

export default function Ex15() {
  return (
    <div className="ex15-page">
      <header className="ex15-header">
        <span className="ex15-kicker">React · Exercise 15</span>
        <h1>Reducers</h1>
      </header>
      <Counter />
      <QuestionBank />
    </div>
  );
}
