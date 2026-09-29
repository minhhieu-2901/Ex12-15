import Ex12 from "./components/Ex12";
import Ex13 from "./components/Ex13";
import Ex14 from "./components/ex14";
import Ex15 from "./components/Ex15";
import "./App.css";

function App() {
  return (
    <main className="all-exercises">
      <section aria-labelledby="ex12-label" className="app-exercise">
        <h2 className="app-exercise-label" id="ex12-label">
          Ex 12
        </h2>
        <Ex12 />
      </section>
      <section aria-labelledby="ex13-label" className="app-exercise">
        <h2 className="app-exercise-label" id="ex13-label">
          Ex 13
        </h2>
        <Ex13 />
      </section>
      <section aria-labelledby="ex14-label" className="app-exercise">
        <h2 className="app-exercise-label" id="ex14-label">
          Ex 14
        </h2>
        <Ex14 />
      </section>
      <section aria-labelledby="ex15-label" className="app-exercise">
        <h2 className="app-exercise-label" id="ex15-label">
          Ex 15
        </h2>
        <Ex15 />
      </section>
    </main>
  );
}

export default App;
