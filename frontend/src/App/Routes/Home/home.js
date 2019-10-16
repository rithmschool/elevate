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
          <div className="card mb-3">
            <div className="row no-gutters">
              <div className="col-md-4">
                <img className="card-img" src={img1} alt="working" />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. 
                This content is a little bit longer.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="card mb-3">
            <div className="row no-gutters">
              <div className="col-md-4">
                <img className="card-img" src={img1} alt="working" />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. 
                This content is a little bit longer.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="card mb-3">
            <div className="row no-gutters">
              <div className="col-md-4">
                <img className="card-img" src={img1} alt="working" />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. 
                This content is a little bit longer.</p>
                </div>
              </div>
            </div>
          </div>
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
