// It always rerenders

import { useEffect, useRef, useState } from "react"
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
  return <div className="box">
    <Rerender />
    <h3>Component A</h3>
    <ComponentB />
  </div>
}

function ComponentB() {
  return <div className="box">
    <Rerender />
    <h3>Component B</h3>
    <ComponentC />
  </div>
}

function ComponentC() {
  return <div className="box">
    <Rerender />
    <h3>Component C</h3>
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