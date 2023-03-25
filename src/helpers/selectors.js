export function getAppointmentsForDay(state, day) {
  //find the day obbject in the state.days array where the name matches the provided day
  const selectedDay = state.days.find(dayObj => dayObj.name === day);
  //if there's no matching day object, return an empty array
  if (!selectedDay) return [];
  //map over the appointment ids for the selected day to get the corresponding appointment object from state.appointments
  const appointments = selectedDay.appointments.map(id => state.appointments[id]);
  //return the array of appointment objects 
  return appointments;
}
