import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

//the transition function takes two arguments-the mode we want to transition to and an optional flag replace (defaulting to false)
  function transition(mode, replace = false) {
    //if replace is true, replace the current mode in history with the new mode
  if (replace) {
    //using spread operator to create a new array from the previous history. Remove the last item in the array and replace it with the new mode
    setHistory(prev => [...prev.slice(0, prev.length -1), mode]);
    //if replace isn't true, add the new mode to the end of our history array
  } else {
    setHistory(prev => [...prev, mode]);
  } 
  //set the mode to the new mode
  setMode(mode);
}

function back() {
  if (history.length > 1) { //check if there are previous modes in the history array
    const newHistory= history.slice(0, -1); //create a new history array with the last item removed
    setHistory(newHistory); //update the history state variable with the new history
    setMode(newHistory[newHistory.length - 1]); //set the current mode to the previous mode in the updated history
  } else {
    setMode(initial); //set mode to initial mode
  }

}

  return { mode, transition, back };
}