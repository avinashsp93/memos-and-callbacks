// Situation: We are updating parent's state from Child by passing a event handler to memoed child
// Add useCallback if we don't want to recompute the reference of handleIncrement everytime parent re-renders

import { useEffect, useRef, useState, memo } from "react"
import "./App.css"

function App() {
  const [count, setCount] = useState(0);
  // Add useCallback to complete the code
  const handleIncrement = () => setCount(c => c + 1);

  return <div className="App box">
    <Rerender />
    <h2>Parent</h2>
    <h3>Count : {count}</h3>
    <ComponentA handleIncrement={handleIncrement} />
  </div>
}

const ComponentA = memo(function ComponentA({ handleIncrement }) {
  return <div className="box">
    <Rerender />
    <h3 style={{ color: "green" }}>memo(Child)</h3>
    <p>Here we are updating parent state from child!</p>
    <button onClick={handleIncrement}>Update parent state</button>
  </div >
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