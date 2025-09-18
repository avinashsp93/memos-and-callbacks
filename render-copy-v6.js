// Updating state in every component, sibling is memoed

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
    <div class="flex-row">
      <ComponentB />
      <ComponentD />
    </div>
  </div>
}

const ComponentB = memo(function ComponentB() {
  const [stateB, setStateB] = useState(0);
  return <div className="box">
    <Rerender />
    <h3 style={{ color: "green" }}>memo(Component B)</h3>
    <p>StateB : {stateB}</p>
    <button onClick={() => setStateB(c => c + 1)}>Update State</button>
    <ComponentC />
  </div>
})

function ComponentC() {
  const [stateC, setStateC] = useState(0);

  return <div className="box">
    <Rerender />
    <h3>Component C</h3>
    <p>StateC : {stateC}</p>
    <button onClick={() => setStateC(c => c + 1)}>Update State</button>
  </div>
}

function ComponentD() {
  const [stateD, setStateD] = useState(0);
  return <div className="box">
    <Rerender />
    <h3>Component D</h3>
    <p>StateD : {stateD}</p>
    <button onClick={() => setStateD(c => c + 1)}>Update State</button>
    <ComponentE />
  </div>
}

function ComponentE() {
  const [stateE, setStateE] = useState(0);

  return <div className="box">
    <Rerender />
    <h3>Component E</h3>
    <p>StateE : {stateE}</p>
    <button onClick={() => setStateE(c => c + 1)}>Update State</button>
  </div>
}

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