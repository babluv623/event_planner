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
  // function nextFunction(item) {
  //   console.log(item);
  //   let next;
  //   if (item.recurrence_type === "daily") {
  //     next = new Date(
  //       new Date().setDate(new Date(item.start_date).getDate() + 1)
  //     );

  //     setData(next.toISOString().substring(0, 10));
  //   }

  //   if (item.recurrence_type === "monthly") {
  //     if (new Date(item.start_date).getDate() >= new Date().getDate()) {
  //       next = new Date(
  //         new Date(item.start_date).setMonth(new Date().getMonth())
  //       );
  //     } else {
  //       next = new Date(
  //         new Date(item.start_date).setMonth(new Date().getMonth() + 1)
  //       );
  //     }

  //     setData(next.toISOString().substring(0, 10));
  //   }

  //   if (item.recurrence_type === "weekly") {
  //     next = new Date(
  //       new Date().setDate(new Date(item.start_date).getDate() + 7)
  //     );

  //     setData(next.toISOString().substring(0, 10));
  //   }
  //   if (item.recurrence_type === "yearly") {
  //     next = new Date(
  //       new Date().setDate(new Date(item.start_date).getFullYear() + 1)
  //     );

  //     setData(next.toISOString().substring(0, 10));
  //   }
  //   console.log(data);
  // }

  useEffect(() => {
    getEvent();
    // nextFunction(event);
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
