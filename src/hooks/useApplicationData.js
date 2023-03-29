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
      //updating the appt with the new interview data and setting the state with the new appointment data
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
        updateSpots(appointments);
      });
  };

//function to cancel an interview
const cancelInterview = id => {
  //create a new object with the appt object for the given id and nullify the interview key
  const appointment = {
    ...state.appointments[id],
    interview: null
  };
  //create a new object with all of the appointment objects, replacing the one for the given id with the new object createad above
  const appointments = {
    ...state.appointments,
    [id]: appointment
  };
  
  //send a delete request to the server to delete the appt record with the given id 
  return axios.delete(`/api/appointments/${id}`)
  //if successsful, update the state by copying the existing state, updating the appt with the nullified interview data and updating the spots
    .then(() => {
      const updatedAppointments = {
        ...appointments,
        [id]: appointment
      };
      const updatedDays = state.days.map(day => {
        if (day.appointments.includes(id)) {
          const spots = day.appointments.filter(id => !updatedAppointments[id].interview).length;
          return { ...day, spots };
        }
        return day;
      });
      setState({ ...state, appointments: updatedAppointments, days: updatedDays });
    });
};



  //function to update the remaining spots
  const updateSpots = (appointments) => {
    //find the day object in the state with the same name as the currently selected day
    const dayObj = state.days.find(day => day.name === state.day);
    //filter through the appointments for the selected day to get the number of spots remaining
    const spots = dayObj.appointments.filter(apptId => !appointments[apptId].interview).length;
    //map through the days in state to find the day that matches the selected day and update its spots value
    const updatedDays = state.days.map(day => {
      if (day.name === state.day) {
        return { ...day, spots };
      }
      return day;
    });
    //update the state with the new spots data
    setState(prevState => ({ ...prevState, days: updatedDays }));
  };
  

  return { state, setDay, bookInterview, cancelInterview };
}
