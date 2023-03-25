import "components/Application.scss";
import DayList from "./DayList";
import React, { useState, useEffect } from "react";
import Appointment from "./Appointment";
import axios from "axios";


export default function Application(props) {
  const setDay = day => setState({ ...state, day });
  const setDays = (days) => setState(prev => ({ ...prev, days }));
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });
  const dailyAppointments = [];

  useEffect(() => {
    //make get request to the /api/days endpoint using axios
    axios
      .get("/api/days")
      //if the request is success, update the state with the response data
      .then((response) => {
        setDays(response.data);
        console.log(response.data);
      })
      //if there's an error, log it to the console
      .catch((error) => {
        console.log(error);
      });
  }, []); //run this hook only once after the component mounts 

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
            /* days={days}
             day={day}
             setDay={setDay} */
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
        {dailyAppointments.map(appointment => (
          <Appointment
            key={appointment.id}
            {...appointment}
            time="5pm"
          />
        ))}
      </section>
    </main>
  );
}
