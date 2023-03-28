import "components/Application.scss";
import DayList from "./DayList";
import React, { useState, useEffect } from "react";
import Appointment from "./Appointment";
import axios from "axios";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "../helpers/selectors";

//application component, accepts props as input
export default function Application(props) {
  //function to update the currently selected day of the week in state
  const setDay = day => setState({ ...state, day });
  //set up the state of the Application component using the useState hook
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  //set up useEffect hook to load data from server using axios
  useEffect(() => {
    //promise.all function is used to ensure all requests are executed in parallel. when all requests are complete, the data will be updated in the state
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ])
      .then((all) => {
        setState(prevState => ({ ...prevState, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
     })
      //if there's an error, log it to the console
      .catch((error) => {
        console.log(error);
      });
  }, []); //run this hook only once after the component mounts 

  //function to book an interview
    function bookInterview(id, interview) {
      //send a put request to server to update the appt record with the interview data
      return axios.put(`/api/appointments/${id}`, { interview })
      //if successful, the appt object is updated in the state by copying the exisiting state, updating the appt with the new interview data and setting the state with the new appt data
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
    }

    //call the getAppointmentsForDay helper func to retrieve all appts for the currently selected day of the week from the state
  const appointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day);


  //map through the appointments array to create a new array of appt components to be rendered. for each appt, the getInterview helper func is called to retrieve the interview data associated w/ the appt
  const schedule = appointments.map(appointment => {
    const interview = getInterview(state, appointment.interview);
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
      />
    );
  });


  //renders the user interface of the application
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            value={state.day}
            setDay={setDay}
            onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule}
      </section>
    </main>
  );
}
