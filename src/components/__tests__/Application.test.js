import React from "react";
import { render, cleanup, waitForElement, fireEvent, prettyDOM, getByText, getAllByTestId, getByPlaceholderText, getByAltText, queryByText, queryByAltText, waitForElementToBeRemoved } from "@testing-library/react";
import Application from "components/Application";
import axios from "axios";

afterEach(cleanup);

describe("Application", () => {

  //CHANGES THE SCHEDULE
  it("changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);

    await waitForElement(() => getByText("Monday"));

    fireEvent.click(getByText("Tuesday"));

    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  //BOOKS INTERVIEW
  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    fireEvent.click(getByAltText(appointment, "Add"));
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });

  //CANCELS INTERVIEW
  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );

    fireEvent.click(queryByAltText(appointment, "Delete"));

    expect(getByText(appointment, "Are you sure you would like to delete the appointment?")
    ).toBeInTheDocument();

    fireEvent.click(queryByText(appointment, "Confirm"));

    expect(getByText(appointment, "Deleting")).toBeInTheDocument();

    await waitForElement(() => getByAltText(appointment, "Add"));

    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
  });

  //EDITS INTERVIEW
  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );

    fireEvent.click(getByAltText(appointment, "Edit"));
    fireEvent.change(getByPlaceholderText(appointment, "Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" }
    });

    fireEvent.click(getByText(appointment, "Save"));
    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    await waitForElementToBeRemoved(() => getByText(appointment, "Saving"));

    expect(getByText(appointment, "Lydia Miller-Jones")).toBeInTheDocument();
    expect(getByAltText(appointment, "Edit")).toBeInTheDocument();

    const day = getAllByTestId(container, "day").find(day => getByText(day, "Monday"));

    expect(getByText(day, /1 spot remaining/i)).toBeInTheDocument();
  });

  //SAVE ERROR
  it("shows the save error when failing to save an appointment", async () => {
    axios.put.mockRejectedValueOnce();
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointment = getAllByTestId(container, "appointment")[0];

    fireEvent.click(getByAltText(appointment, "Add"));
    fireEvent.change(getByPlaceholderText(appointment, "Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" }
    });

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    await waitForElementToBeRemoved(() => getByText(appointment, "Saving"));
    expect(getByText(appointment, "Could not save appointment.")).toBeInTheDocument();
  });

  //DELETE ERROR
  it("shows the delete error when failing to delete an existing appointment", async () => {
    axios.delete.mockRejectedValueOnce();
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointment = getAllByTestId(container, "appointment").find
    (appointment => queryByText(appointment, "Archie Cohen"));

    fireEvent.click(getByAltText(appointment, "Delete"));
    expect(getByText(
      appointment, /Are you sure you would like to delete the appointment?/i))
      .toBeInTheDocument();
    fireEvent.click(getByText(appointment, "Confirm"));

    expect(getByText(appointment, "Deleting")).toBeInTheDocument();

    await waitForElementToBeRemoved(() => getByText(appointment, "Deleting"));
    expect(getByText(appointment, "Could not delete appointment.")).toBeInTheDocument();
  });

});