import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

// import axios from "axios";
function Events({ match }) {
  const history = useHistory();
  const [event, setEvent] = useState({
    event_name: "",
    event_description: "",
    start_date: "",
    end_date: "",
    recurrence_type: "",
  });
  const handleChange = ({ target: { name, value } }) => {
    setEvent({ ...event, [name]: value });
  };
  // const api = axios.create({
  //   baseURL: `http://localhost:3300`,
  // });

  const handleSubmit = async (match) => {
    console.log(match);

    if (match) {
      const updateEvent = async () => {
        const {
          event_name,
          event_description,
          start_date,
          end_date,
          recurrence_type,
        } = event;

        const res = await fetch(`/update/${match.params.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            event_name,
            event_description,
            start_date,
            end_date,
            recurrence_type,
          }),
        });

        const data = await res.json();
        if (res.status === 422 || !data) {
          alert("invalid data");
        } else {
          alert("updated");
          history.push("/Home");
        }
      };
      updateEvent();
    } else {
      const {
        event_name,
        event_description,
        start_date,
        end_date,
        recurrence_type,
      } = event;

      const res = await fetch("/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          event_name,
          event_description,
          start_date,
          end_date,
          recurrence_type,
        }),
      });

      const data = await res.json();
      if (res.status === 422 || !data) {
        alert("invalid data");
      } else {
        alert("success");
        history.push("/Home");
      }
    }
  };

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
      <div className="signup-form">
        <form method="POST">
          {match ? (
            <p>Please fill in this form to update an Event</p>
          ) : (
            <p>Please fill in this form to create an Event</p>
          )}
          <hr />
          {match && (
            <div className="form-group">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">Event_id</span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  name="event_id"
                  value={match.params.id}
                  disabled
                />
              </div>
            </div>
          )}
          <div className="form-group">
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">Event_name</span>
              </div>
              <input
                type="text"
                className="form-control"
                name="event_name"
                placeholder="Event Name"
                value={event.event_name}
                onChange={handleChange}
                maxLength="30"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">Event-description</span>
              </div>
              <input
                type="text"
                className="form-control"
                name="event_description"
                placeholder="Event Description"
                value={event.event_description}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form-group">
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">Start-date</span>
              </div>
              <input
                type="date"
                className="form-control"
                name="start_date"
                value={event.start_date.substring(0, 10)}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">End-date</span>
              </div>
              <input
                type="date"
                className="form-control"
                name="end_date"
                value={
                  event.end_date
                    ? event.end_date.substring(0, 10)
                    : event.end_date
                }
                onChange={handleChange}
              />
            </div>
          </div>
          <label>
            Repeat:
            <select
              name="recurrence_type"
              value={event.recurrence_type}
              onChange={handleChange}
            >
              <option value="single">Single</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </label>

          <div className="form-group">
            <input
              type="button"
              onClick={() => handleSubmit(match)}
              className="btn btn-primary btn-lg"
              value={match ? "Update" : "Create"}
            />
          </div>
        </form>
      </div>
    </>
  );
}

export default Events;
