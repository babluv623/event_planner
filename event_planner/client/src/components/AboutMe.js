import React, { useEffect } from "react";
import dp from "../images/dp.jpg";
import { useHistory } from "react-router-dom";
const AboutMe = () => {
  const history = useHistory();
  const callAboutPage = async () => {
    try {
      const res = await fetch("/about", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      console.log(data);
      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
      history.push("/Login");
    }
  };
  useEffect(() => {
    callAboutPage();
  }, []);
  return (
    <>
      <div className="container emp-profile carousel">
        <form method="GET">
          <div className="row">
            <div className="col-md-4 img-box">
              <img src={dp} alt="me" />
            </div>
            <div className="col-md-6">
              <div className="profile-head">
                <h5>bablu verma</h5>
                <h6>web developer</h6>
                <p className="profile-rating mt-3 mb-5">
                  Ranking: <span> 1/10 </span>
                </p>
                <nav className="nav nav-tabs nav-justified">
                  <a
                    className="nav-item nav-link active"
                    href="#home"
                    id="home-tab"
                    data-toggle="tab"
                    role="tab"
                  >
                    About
                  </a>

                  <a
                    className="nav-item nav-link"
                    href="#profile"
                    id="profile-tab"
                    data-toggle="tab"
                    role="tab"
                  >
                    Timeline
                  </a>
                </nav>
              </div>
            </div>
            <div className="col-md-2">
              <input
                type="submit"
                className="profile-edit-btn"
                name="btnAddMore"
                value="Edit Profile"
              />
            </div>
          </div>
          <div className="row">
            {/* {left-side-ulr} */}
            <div className="col-md-4">
              <div className="profile-work">
                <p>WORK LINK</p>
                <a href="www.google.com" target="_bablu">
                  google
                </a>
                <br />
                <a href="www.google.com" target="_bablu">
                  google
                </a>
                <br />
                <a href="www.google.com" target="_bablu">
                  google
                </a>
                <br />
                <a href="www.google.com" target="_bablu">
                  google
                </a>
                <br />

                <a href="www.google.com" target="_bablu">
                  google
                </a>
                <br />
                <a href="www.google.com" target="_bablu">
                  google
                </a>
              </div>
            </div>
            {/* right-side-data toggle */}
            <div className="col-md-8 pl-5 about-info">
              <div className="tab-content profile-tab" id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="home"
                  role="tabpanel"
                  aria-labelledby="home-tab"
                >
                  <div className="row mt-3">
                    <div className="col-md-6">
                      <label>User ID</label>
                    </div>
                    <div className="col-md-6">
                      <p>8496840956</p>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-6">
                      <label>Name</label>
                    </div>
                    <div className="col-md-6">
                      <p>Bablu Verma</p>
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="profile"
                  role="tabpanel"
                  aria-labelledby="profile-tab"
                >
                  <div className="row mt-3">
                    <div className="col-md-6">
                      <label>Experince</label>
                    </div>
                    <div className="col-md-6">
                      <p>Expert</p>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-6">
                      <label>Hourly Rate</label>
                    </div>
                    <div className="col-md-6">
                      <p>$40</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AboutMe;
