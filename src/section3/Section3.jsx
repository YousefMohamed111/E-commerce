import React from "react";
import img1 from "./img/mobile-app.png";
import img2 from "./img/home.png";
import img3 from "./img/mens-clothing.png";
import img4 from "./img/gamepad.png";
import "./section3.css";
import { Link } from "react-router-dom";
function Section3() {
  return (
    <>
      <div className="container">
        <div>
          <p className="text-center text-xl font-bold my-4">What you want?</p>
        </div>
        <div className="row">
          <div className="col-6 col-sm-4 col-md-3">
            <Link to="/phones">
              <img src={img1} className="img-fluid phone" alt="Phones" />
            </Link>
          </div>
          <div className="col-6 col-sm-4 col-md-3">
            <Link to="/SmartHome">
              <img src={img2} className="img-fluid phone" alt="Smart Home" />
            </Link>
          </div>
          <div className="col-6 col-sm-4 col-md-3">
            <Link to="/Games">
              <img src={img3} className="img-fluid phone" alt="Games" />
            </Link>
          </div>
          <div className="col-6 col-sm-4 col-md-3">
            <Link to="/Games">
              <img src={img4} className="img-fluid phone" alt="Games" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Section3;
