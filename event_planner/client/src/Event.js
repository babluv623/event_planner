import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Event = ({ match }) => {
  const [event, setEvent] = useState([]);
  const getEvent = async () => {
    try {
      const res = await fetch(`/event/${match.params.id}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      console.log(data);
      setEvent(data);
      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getEvent();
  }, []);
  return (
    <>
      <table className="table table-bordered table-hover">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Event_Name</th>
            <th scope="col">Event_Description</th>
            <th scope="col">Start_Date</th>
            <th scope="col">End_Date</th>

            <th scope="col">Recurrence_Type</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{event.event_name}</td>
            <td>{event.event_description}</td>
            <td>{event.start_date}</td>
            <td>{event.end_date}</td>

            <td>{event.recurrence_type}</td>
          </tr>
        </tbody>
      </table>

      <Link to="/Home">
        <button className="btn btn-primary">Home</button>
      </Link>
    </>
  );
};

export default Event;
