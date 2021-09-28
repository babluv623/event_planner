import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Event from "./Event";
import Login from "./components/Login";
import Signup from "./components/Signup";
import AboutMe from "./components/AboutMe";
import Events from "./Events";
import { Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
function App() {
  return (
    <>
      <Navbar />
      <br />
      <Route exact path="/">
        <Signup />
      </Route>
      <Route exact path="/Home">
        <Home />
      </Route>

      <Route exact path="/AboutMe">
        <AboutMe />
      </Route>

      <Route exact path="/Login">
        <Login />
      </Route>
      <Route exact path="/Events">
        <Events />
      </Route>
      <Route exact path="/event/:id" render={(props) => <Event {...props} />} />
      <Route
        exact
        path="/update/:id"
        render={(props) => <Events {...props} />}
      />
    </>
  );
}

export default App;
