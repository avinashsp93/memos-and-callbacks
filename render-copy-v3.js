// Updating state in every component, but ComponentC memoed

import { useEffect, useRef, useState, memo } from "react"
import "./App.css"

function App() {
  const [count, setCount] = useState(0);
  const handleIncrement = () => setCount(c => c + 1);

  return <div className="App box">
    <Rerender trigger={count} />
    <h2>App</h2>
    <h3>Count : {count}</h3>
    <button onClick={handleIncrement}>Update count</button>
    <ComponentA />
  </div>
}

function ComponentA() {
  const [stateA, setStateA] = useState(0);
  return <div className="box">
    <Rerender />
    <h3>Component A</h3>
    <p>StateA : {stateA}</p>
    <button onClick={() => setStateA(c => c + 1)}>Update State</button>
    <ComponentB />
  </div>
}

function ComponentB() {
  const [stateB, setStateB] = useState(0);
  return <div className="box">
    <Rerender />
    <h3>Component B</h3>
    <p>StateB : {stateB}</p>
    <button onClick={() => setStateB(c => c + 1)}>Update State</button>
    <ComponentC />
  </div>
}

const ComponentC = memo(function ComponentC() {
  const [stateC, setStateC] = useState(0);

  return <div className="box">
    <Rerender />
    <h3 style={{ color: "green" }}>memo(Component C)</h3>
    <p>StateC : {stateC}</p>
    <button onClick={() => setStateC(c => c + 1)}>Update State</button>
  </div>
})

function Rerender() {
  const ref = useRef(null);

  useEffect(() => {
    // references the rendering DOM element
    const el = ref.current;

    if (!el) {
      console.log('element not found returning...')
      return;
    };

    // Everytime the Renderer element is rendered or re-rendered, add the class
    el.classList.add("pop-in-out");

    // Remove it after animation ends (so it can re-trigger on next render)
    const handleAnimationEnd = () => {
      el.classList.remove("pop-in-out");
    };
    el.addEventListener("animationend", handleAnimationEnd);

    // Cleanup listener
    return () => {
      el.removeEventListener("animationend", handleAnimationEnd);
    };

  })
  return <h4 ref={ref} className="alert">RE-RENDER</h4>
}

export default App;