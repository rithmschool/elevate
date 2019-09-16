import React from "react";
import "./home.css";
import { Button } from "reactstrap";
import img1 from "../img/001.jpg";
import { Link } from 'react-router-dom';

class Home extends React.Component {
  render() {
    return (
      <div>
        <div className="Home-container">
          <img src={img1} className="Home-image1" alt="image1" />
          <h1 className="Home-h1"> Are You paid what you deserve?</h1>
        </div>

        <div className="Home-template">
          <p>Templates and professionals available 24/7</p>
          <i className="fas fa-user-tie"></i>
        </div>

        <div className="Home-database">
          <i className="fas fa-chart-bar"></i>
          <p>Get yout comp verified by our proprietary database</p>
        </div>

        <div className="Home-stats">
          <div className="row">
            <div className="col-sm-4">
              <div className="Home-circle ">
                <p>75% increase offer</p>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="Home-circle ">
                <p>20% average increase in salary</p>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="Home-circle ">
                <p>90% better understand comp</p>
              </div>
            </div>
          </div>
        </div>
        <div className="Home-get-started">
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
