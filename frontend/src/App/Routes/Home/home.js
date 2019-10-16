import React from "react";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";

import img1 from "./img/001.jpg";
import "./home.css";

class Home extends React.Component {
  render() {
    return (
      <div>
        <div className="Home_container">
          <img src={img1} className="Home_image1" alt="image1" />
          <h1 className="Home_h1"> Are You paid what you deserve?</h1>
        </div>

        <div className="Home_template">
          <img src={img1} alt="working"/>
          <div>
          <h1><b>Why Bella?</b></h1>
          <p>Mission statement goes here, sell a story to the user.</p>
          </div>     
        </div>

        <div className="Home_database">
          <i className="fas fa-chart-bar"></i>
          <p>Get yout comp verified by our proprietary database</p>
        </div>

        <div className="Home_stats">
          <div className="row">
            <div className="col-sm-4">
              <div className="Home_circle ">
                <p>75% increase offer</p>
              </div>
            </div>

            <div className="col-sm-4">
              <div className="Home_circle ">
                <p>20% average increase in salary</p>
              </div>
            </div>

            <div className="col-sm-4">
              <div className="Home_circle ">
                <p>90% better understand comp</p>
              </div>
            </div>
          </div>
        </div>

        <div className="Home_get-started">
          <h2 className="">Get Started Today</h2>

          <Link to="/ask-an-expert">
            <Button color="primary">Ask An Expert</Button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Home;
