import "components/Application.scss";
import DayList from "./DayList";
import React, { useState, useEffect } from "react";
import Appointment from "./Appointment";
import axios from "axios";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "../helpers/selectors";
import useApplicationData from "../hooks/useApplicationData";


//application component, accepts props as input
export default function Application(props) {
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();

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
        cancelInterview={cancelInterview}
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