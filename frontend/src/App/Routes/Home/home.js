import React from "react";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";

import "./home.css";


class Home extends React.Component {
  render() {
    const routeStr = localStorage.token ? "/ask-an-expert" : "/login";
    return (
      <div>
        <div className="Home_container">
          <h1 className="text-center">Your Personal HR Team</h1>
          <h5>A team with your best interest in mind</h5>
          <Link to={routeStr} className="btn btn-primary">
            Get Started
          </Link>
        </div>

        <div className="Home_template">
          <div className="Home_template_child">
            <img className="card-img" src={img1} alt="working" />
          </div>
          <div className="Home_template_child">
            <h1>
              <b>Why Brella?</b>
            </h1>
            <p>
              Mission statement goes here, sell a story to the user. Mission
              statement goes here, sell a story to the user. Mission statement
              goes here, sell a story to the user. Mission statement goes here,
              sell a story to the user. Mission statement goes here, sell a
              story to the user. Mission statement goes here, sell a story to
              the user.
            </p>
          </div>
        </div>

        <div className="Home_database">
          <div className="col-sm-4">
            <img className="center-block img-thumbnail" src={img1} alt="image1"  />
            <h3 className="text-center">Step 1</h3>
            <p className="text"></p>
          </div>
          <div className="col-sm-4">
            <img className="img-thumbnail" src={img1} alt="image1" />
            <h3>Step 2</h3>
          </div>
          <div className="col-sm-4">
            <img className="img-thumbnail" src={img1} alt="image1" />
            <h3>Step 3</h3>
          </div>
        </div>

        {/* <div className="Home_stats">
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
    </div> */}

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
