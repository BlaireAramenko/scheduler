import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  //map over days array from props to create an array of DayListItem components
  const days = props.days.map(day => {
    return (
    //create a new DayListItem component for each day
    <DayListItem
    //set the unique key attribute to the day's id
    key={day.id}
    //set name attribute to the day's name
    name={day.name}
    //set the spots attrib to the day's number of spots
    spots={day.spots}
    //set the selected attrib to true if the day's name matches the selected day in props
    selected={day.name === props.value}
    //set the setDay attrib to the setDay function passed in through props
    setDay={props.onChange}
    />
    );
    });
  //render an unordered list with the array of DayListItem components inside it
  return <ul>{days}</ul>;
}