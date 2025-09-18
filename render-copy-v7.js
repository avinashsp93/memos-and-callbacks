// Sending a memoed child component a property by reference, re-render the child component

import { useEffect, useRef, useState, memo } from "react"
import "./App.css"

function App() {
  const [count, setCount] = useState(0);
  const handleIncrement = () => setCount(c => c + 1);

  return <div className="App box">
    <Rerender trigger={count} />
    <h2>Parent</h2>
    <h3>Count : {count}</h3>
    <button onClick={handleIncrement}>Update parent state</button>
    <ComponentA borderRadiusProp={{ borderRadius: "25px" }} />
  </div>
}

const ComponentA = memo(function ComponentA({ borderRadiusProp }) {
  const [stateA, setStateA] = useState(0);

  return <div className="box" style={borderRadiusProp}>
    <Rerender />
    <h3 style={{ color: "green" }}>memo(Child)</h3>
    <p>StateChild received a borderRadius of {borderRadiusProp.borderRadius}</p>
    <button onClick={() => setStateA(c => c + 1)}>Update child state</button>
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