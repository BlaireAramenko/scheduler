import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

console.log(history);
  //this transition func sets the mode state variable to the newmode value passed into the func
  const transition = (newMode, replace) => {
    setMode(newMode);
    //if the replace param is true, it replaces the element of the history array with the new mode
  if (replace) {
    setHistory(prev => [...prev.slice(0, prev.length - 1), newMode]);
    //else it adds the previous mode (stored in mode) to the history array
  } else {
    setHistory(prev => [...prev, newMode]);
  } 
};

// this back function is used to transition back to the previous mode
const back = () => {
  //if the history array has more than one element, it sets the mode state variable to the previous mode and removes the last element of the history array
  if (history.length > 1) { 
    setHistory(prev => {
      setMode(prev[prev.length - 2]);
      return [...prev.slice(0, prev.length - 1)]}); 
  } 
};

  return { mode, transition, back };
}