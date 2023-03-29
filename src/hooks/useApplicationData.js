import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  //set up the state of the Application component using the useState hook
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  //load data from server using axios
  useEffect(() => {
    //promise.all function is used to ensure all requests are executed in parallel 
    //when all requests are complete, the data will be updated in the state
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ])
      .then((all) => {
        setState(prevState => ({ ...prevState, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
      })
      //if there's an error, log it to the console.
      .catch((error) => {
        console.log(error);
      });
  }, []); //run this hook only once after the component mounts

  //function to update the currently selected day of the week in state
  const setDay = day => setState({ ...state, day });

  //function to book an interview
  const bookInterview = (id, interview) => {
    //send a PUT request to server to update the appt record with the interview data
    return axios.put(`/api/appointments/${id}`, { interview })
      //if successful, the appt obj is updated in the state by copying the existing state, 
      // updating the appt with the new interview data and setting the state with the new appointment data
      .then(() => {
        const appointment = {
          ...state.appointments[id],
          interview: { ...interview }
        };
        const appointments = {
          ...state.appointments,
          [id]: appointment
        };
        setState({ ...state, appointments });
      });
  };

  //function to cancel an interview
  const cancelInterview = id => {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.delete(`/api/appointments/${id}`)
      .then(() => setState({ ...state, appointments }));
  };



  return { state, setDay, bookInterview, cancelInterview };
}
