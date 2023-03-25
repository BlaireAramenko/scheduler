import "components/Application.scss";
import DayList from "./DayList";
import React, { useState, useEffect } from "react";
import Appointment from "./Appointment";
import axios from "axios";
import { getAppointmentsForDay } from "../helpers/selectors";


export default function Application(props) {
  const setDay = day => setState({ ...state, day });
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments")
    ])
      .then((all) => {
        console.log(all[0].data); //days data
        console.log(all[1].data); //appointments data
        setState(prevState => ({ ...prevState, days: all[0].data, appointments: all[1].data }));
     })
      //if there's an error, log it to the console
      .catch((error) => {
        console.log(error);
      });
  }, []); //run this hook only once after the component mounts 

  const dailyAppointments = getAppointmentsForDay(state, state.day);


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
