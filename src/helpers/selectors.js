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

export function getInterviewersForDay(state, day) {
  const selectedDay = state.days.find(dayObj => dayObj.name === day);
  if (!selectedDay) return [];
  const interviewers = selectedDay.interviewers.map(id => state.interviewers[id]);
  return interviewers;
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  const interviewerId = interview.interviewer;
  const interviewer = state.interviewers[interviewerId];
  if (!interviewer) {
    return null;
  }
  return {
    student: interview.student,
    interviewer: {
      id: interviewer.id,
      name: interviewer.name,
      avatar: interviewer.avatar
    }
  };
}