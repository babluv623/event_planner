const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Authenticate = require("../middleware/Authenticate.js");

require("../db/conn");
const User = require("../model/userSchema.js");
const Event = require("../model/eventSchema.js");

router.get("/", (req, res) => {
  res.send("hello router");
});
// register route
router.post("/register", async (req, res) => {
  const { name, email, phone, work, password, cpassword } = req.body;
  if (!name || !email || !phone || !work || !password || !cpassword) {
    return res.status(422).json({ message: `plz enter the required field` });
  }
  try {
    const userExists = await User.findOne({ email: email });
    if (userExists) {
      return res.status(422).json({ message: "email already exists" });
    } else if (password !== cpassword) {
      return res.status(422).json({ message: "password does not match" });
    } else {
      const user = new User({ name, email, phone, work, password, cpassword });
      // save krne se pehle passwrd hashing using bcrypt

      await user.save();

      res.status(201).json({ message: "user registered succcessfully" });
    }
  } catch (err) {
    res.send(err);
  }
});

// Login route

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "plz fill the data" });
    }
    const userLogin = await User.findOne({ email: email });
    // console.log(userLogin);
    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);

      const token = await userLogin.generateAuthToken();
      res.cookie("token", token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true,
      });
      console.log(token);

      if (email && isMatch) {
        res.json("login successfull");
      } else {
        res.status(400).json({ message: "invalid credentials" });
      }
    } else {
      res.status(400).json({ message: "invalid credentials" });
    }
  } catch (err) {
    console.log(err);
  }
});

// about page
router.get("/about", Authenticate, (req, res) => {
  res.send(req.rootUser);
});

router.post("/events", async (req, res) => {
  const {
    event_name,
    event_description,
    start_date,
    end_date,
    recurrence_type,
  } = req.body;
  if (
    !event_name ||
    !start_date ||
    (!recurrence_type && !event_name.length == 30)
  ) {
    return res.status(422).json({
      message: `plz enter the required field `,
    });
  }
  try {
    const event = new Event({
      event_name,
      event_description,
      start_date,
      end_date,
      recurrence_type,
    });
    // save krne se pehle passwrd hashing using bcrypt

    await event.save();

    res.status(201).json({ message: "event created succcessfully" });
  } catch (err) {
    res.send(err);
  }
});

router.get("/event", async (req, res) => {
  try {
    const data = await Event.find();
    res.json(data);
    console.log(data);
  } catch (err) {
    console.log(err);
  }
});
router.get("/event/:id", async (req, res) => {
  console.log(req.params.id);
  const event = await Event.findById(req.params.id);
  console.log(event);
  res.json(event);
});
router.delete("/event/:id", async (req, res) => {
  console.log(req.params.id);
  await Event.findByIdAndDelete(req.params.id, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("deleted");
    }
  });
  const event = await Event.find();
  res.json(event);
});
router.put("/update/:id", async (req, res) => {
  const event = await Event.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        event_name: req.body.event_name,
        event_description: req.body.event_description,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        recurrence_type: req.body.recurrence_type,
      },
    },
    { upsert: true, new: true }
  );
  console.log(event);

  res.json(event);
});

module.exports = router;
