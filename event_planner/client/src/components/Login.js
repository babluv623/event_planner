import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await res.json();
    if (res.status === 400 || !data) {
      alert("invalid credentials");
    } else {
      alert("login succcessfull");
      history.push("/Home");
    }
  };

  return (
    <>
      <div className="login-form">
        <form method="POST" onSubmit={handleSubmit}>
          <h2 className="text-center">Log in</h2>
          <div className="form-group">
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <span className="fa fa-user"></span>
                </span>
              </div>
              <input
                type="text"
                className="form-control"
                name="username"
                placeholder="Username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i className="fa fa-lock"></i>
                </span>
              </div>
              <input
                type="password"
                className="form-control"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <button
              type="submit"
              className="btn btn-primary login-btn btn-block"
            >
              Log in
            </button>
          </div>
          <div className="clearfix">
            <label className="float-left form-check-label">
              <input type="checkbox" /> Remember me
            </label>
            <NavLink to="#" className="float-right">
              Forgot Password?
            </NavLink>
          </div>
          <div className="or-seperator">
            <i>or</i>
          </div>
          <p className="text-center">Login with your social media account</p>
          <div className="text-center social-btn">
            <NavLink to="/" className="btn btn-secondary">
              <i className="fa fa-facebook"></i>&nbsp; Facebook
            </NavLink>
            <NavLink to="/" className="btn btn-info">
              <i className="fa fa-twitter"></i>&nbsp; Twitter
            </NavLink>
            <NavLink to="/" className="btn btn-danger">
              <i className="fa fa-google"></i>&nbsp; Google
            </NavLink>
          </div>
        </form>
        <p className="text-center text-muted small">
          Don't have an account? <NavLink to="/signup">Sign up here!</NavLink>
        </p>
      </div>
    </>
  );
}

export default Login;
