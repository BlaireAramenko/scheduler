import React from "react";
import InterviewerListItem from "components/InterviewerListItem";
import classNames from "classnames";
import "components/InterviewerList.scss";

/*export default function InterviewerList(props) {
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list"></ul>
    </section>
  );
}*/

/*export default function InterviewerList(props) {
  //create a new array of InterviewerListItem components by using the map function to iterate over each interviewer in the props.interviewers array
  const interviewers = props.interviewers.map(interviewer => (
    <InterviewerListItem
    key={interviewer.id}
    name={interviewer.name}
    avatar={interviewer.avatar}
    selected={interviewer.id === props.interviewer}
    setInterviewer={interviewer.setInterviewer}
    />
  ));
  return (
    <section className="interviewers" >
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewers}</ul>
    </section>
  );
} */

/*export default function InterviewerList(props) {
  //create a new array of InterviewerListItem components by using the map function to iterate over each interviewer in the props.interviewers array
  const interviewers = props.interviewers.map(interviewer => (
    //key, id, name, avatar, selected are all props. These are the props we're passing
    <InterviewerListItem
    key={interviewer.id}
    id={interviewer.id}
    name={interviewer.name}
    avatar={interviewer.avatar}
    selected={interviewer.id === props.interviewer}
    setInterviewer={props.setInterviewer}

    />
  ));
  return (
    <section className="interviewers" >
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewers}</ul>
    </section>
  );
} */
  
/*export default function InterviewerList(props) {
  //create a new array of InterviewerListItem components by using the map function to iterate over each interviewer in the props.interviewers array
  const interviewers = props.interviewers.map((interviewer) => {
    return (
    //key, id, name, avatar, selected are all props. These are the props we're passing
    <InterviewerListItem
    key={interviewer.id}
    name={interviewer.name}
    avatar={interviewer.avatar}
    selected={interviewer.id === props.interviewer}
    setInterviewer={() => props.setInterviewer(interviewer.id)}
    />
    );
  });
  return (
    <section className="interviewers" >
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewers}</ul>
    </section>
  );
}*/

export default function InterviewerList(props) {
  //create a new array of InterviewerListItem components by using the map function to iterate over each interviewer in the props.interviewers array
  const interviewers = props.interviewers.map((interviewer) => {
    return (
    //key, id, name, avatar, selected are all props. These are the props we're passing
    <InterviewerListItem
    key={interviewer.id}
    name={interviewer.name}
    avatar={interviewer.avatar}
    selected={interviewer.id === props.value}
    setInterviewer={() => props.onChange(interviewer.id)}
    />
    );
  });
  return (
    <section className="interviewers" >
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewers}</ul>
    </section>
  );
}