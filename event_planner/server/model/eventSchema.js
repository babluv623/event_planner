const mongoose = require("mongoose");
const eventSchema = new mongoose.Schema({
  event_name: {
    type: String,
    required: true,
  },
  event_description: {
    type: String,
  },
  start_date: {
    type: Date,
    required: true,
  },
  end_date: {
    type: Date,
  },
  recurrence_type: {
    type: String,
    required: true,
  },
});

const Event = mongoose.model("EVENT", eventSchema);

module.exports = Event;
