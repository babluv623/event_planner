import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Event from "../Event.js";
import Events from "../Events.js";

function Home() {
  const [events, setEvents] = useState([]);
  const getEvents = async () => {
    try {
      const res = await fetch("/event", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      console.log(data);
      setEvents(data);
      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getEvents();
  }, []);

  const handleChange = ({ target: { value } }) => {
    console.log(value);
    let filtered_items = [];

    if (value === "today") {
      events.forEach((item) => {
        if (new Date(item.start_date) > new Date()) {
          return;
        }

        if (item.recurrence_type === "single") {
          console.log(item.start_date);
          if (item.start_date === new Date().toISOString().substring(0, 10)) {
            filtered_items.push(item);
          }
        }

        if (item.recurrence_type === "daily") {
          if (
            !item.end_date ||
            new Date(item.end_date) > new Date() ||
            new Date(item.end_date).toISOString().substring(0, 10) ==
              new Date().toISOString().substring(0, 10)
          ) {
            filtered_items.push(item);
          }
        }

        if (item.recurrence_type === "weekly") {
          if (
            (!item.end_date ||
              new Date(item.end_date) > new Date() ||
              new Date(item.end_date).toISOString().substring(0, 10) ==
                new Date().toISOString().substring(0, 10)) &&
            new Date(item.start_date).getDay() === new Date().getDay()
          ) {
            filtered_items.push(item);
          }
        }

        if (item.recurrence_type === "monthly") {
          if (
            (!item.end_date ||
              (new Date(item.end_date).getMonth() >= new Date().getMonth() &&
                new Date(item.end_date).getFullYear() >=
                  new Date().getFullYear())) &&
            new Date(item.start_date).getDate() === new Date().getDate()
          ) {
            filtered_items.push(item);
          }
        }

        if (item.recurrence_type === "yearly") {
          if (
            (!item.end_date ||
              new Date(item.end_date).getFullYear() >=
                new Date().getFullYear()) &&
            new Date(item.start_date).toISOString().substring(0, 10) ===
              new Date().toISOString().substring(0, 10)
          ) {
            filtered_items.push(item);
          }
        }
      });
    }

    if (value === "this_week") {
      // console.log('hi');

      let this_week_start = new Date(
        new Date().setDate(new Date().getDate() - new Date().getDay())
      )
        .toISOString()
        .substring(0, 10);
      let this_week_end = new Date(
        new Date().setDate(new Date().getDate() + 6 - new Date().getDay())
      )
        .toISOString()
        .substring(0, 10);
      console.log(new Date(this_week_start));
      console.log(new Date(this_week_end));
      events.forEach((item) => {
        if (new Date(item.start_date) > new Date()) {
          return;
        }

        if (item.recurrence_type === "single") {
          console.log(new Date(item.start_date), new Date(this_week_start));
          if (
            new Date(item.start_date) >= new Date(this_week_start) &&
            new Date(item.start_date) <= new Date(this_week_end)
          ) {
            // console.log('if');
            filtered_items.push(item);
          }
        }

        if (item.recurrence_type === "daily") {
          if (
            !item.end_date ||
            (new Date(item.end_date) >= new Date(this_week_start) &&
              new Date(item.start_date) <= new Date(this_week_end))
          ) {
            console.log("abc");
            filtered_items.push(item);
          }
        }

        if (item.recurrence_type === "weekly") {
          if (
            !item.end_date ||
            new Date(item.end_date) > new Date() ||
            new Date(item.end_date).toISOString().substring(0, 10) ==
              new Date().toISOString().substring(0, 10)
          ) {
            filtered_items.push(item);
          }
        }

        if (item.recurrence_type === "monthly") {
          if (
            (!item.end_date ||
              (new Date(item.end_date).getMonth() >= new Date().getMonth() &&
                new Date(item.end_date).getFullYear() >=
                  new Date().getFullYear())) &&
            new Date(item.start_date).getDate() === new Date().getDate()
          ) {
            filtered_items.push(item);
          }
        }

        if (item.recurrence_type === "yearly") {
          if (
            (!item.end_date ||
              new Date(item.end_date).getFullYear() >=
                new Date().getFullYear()) &&
            new Date(item.start_date).getDay() >=
              new Date(this_week_start).getDay()
          ) {
            filtered_items.push(item);
          }
        }
      });
    }

    // console.log(filtered_items);
    setEvents(filtered_items);
  };

  const deleteEvent = async (id) => {
    const result = window.confirm("this event will be deleted");
    if (result) {
      try {
        const res = await fetch(`/event/${id}`, {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const data = await res.json();
        console.log(data);
        setEvents(data);
        if (!res.status === 200) {
          const error = new Error(res.error);
          throw error;
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      return;
    }
  };

  return (
    <>
      <div className="list">
        <Link to="/Events">
          <button className="btn btn-primary">Creat New Event</button>
        </Link>
        <br />
        <br />
        <label>
          Filter:
          <select id="" name="" onChange={handleChange}>
            <option value="today">today</option>
            <option value="this_week">this week</option>
          </select>
        </label>
        <br />
        <h1 className="event-list">List of Events</h1>
      </div>
      <div>
        <table className="table table-bordered table-hover">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Event_Name</th>
              <th scope="col">Event_Description</th>
              <th scope="col">Start_Date</th>
              <th scope="col">End_Date</th>

              <th scope="col">Recurrence_Type</th>
              <th scope="col" colSpan="3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => {
              return (
                <tr key={event._id}>
                  <td>{event.event_name}</td>
                  <td>{event.event_description}</td>
                  <td>{event.start_date.substring(0, 10)}</td>
                  <td>
                    {event.end_date
                      ? event.end_date.substring(0, 10)
                      : event.end_date}
                  </td>

                  <td>{event.recurrence_type}</td>
                  <td>
                    <Link to={`/event/${event._id}`}>
                      <button
                        className="btn btn-outline-info btn-sm"
                        onClick={() => (
                          <>
                            {console.log(event._id)}
                            <Event id={event._id} />
                          </>
                        )}
                      >
                        Show
                      </button>
                    </Link>
                  </td>
                  <td>
                    <Link to={`/update/${event._id}`}>
                      <button
                        className="btn btn-outline-info btn-sm"
                        onClick={() => (
                          <>
                            {console.log(event._id)}
                            <Events id={event._id} />
                          </>
                        )}
                      >
                        Edit
                      </button>
                    </Link>
                  </td>
                  <td>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => deleteEvent(event._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Home;
