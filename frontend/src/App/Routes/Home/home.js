import React from "react";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";

import "./home.css";

class Home extends React.Component {
  render() {
    return (
      <div>
        <div className="Home_container">
          <h1>Your Personal HR Team</h1>
          <h5>A team with your best interest in mind</h5>
          {localStorage.token ? (
            <Link to="/ask-an-expert">
              <Button color="btn btn-lg">Get Started</Button>
            </Link>
          ) : (
            <Link to="/login">
              <Button color="btn btn-lg">Get Started</Button>
            </Link>
          )}
        </div>

        <div className="Home_template">
          <p>Templates and professionals available 24/7</p>
          <i className="fas fa-user-tie"></i>
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
