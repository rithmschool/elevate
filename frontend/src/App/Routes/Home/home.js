import React from "react";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";

import "./home.css";
import img1 from "./img/001.jpg";
import file from "./img/files.png";
import person from "./img/person.png";
import completed from "./img/completed.png";

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

        <Container fluid className="Home_template">
          <Row>
            <Col md={6}>
              <div>
                <img className="card-img" src={img1} alt="working" />
              </div>
            </Col>
            <Col md={6} style={{display:'flex', alignItems: 'center'}}>
              <div className="Home_template-intro">
                <h1>
                  <b>Why Brella?</b>
                </h1>
                <p>
                  Mission statement goes here, sell a story to the user. Mission
                  statement goes here, sell a story to the user. Mission
                  statement goes here, sell a story to the user. Mission
                  statement goes here, sell a story to the user. Mission
                  statement goes here, sell a story to the user. Mission
                  statement goes here, sell a story to the user.
                </p>
              </div>
            </Col>
          </Row>
        </Container>

        <Container fluid className="Home_database">
          <Row>
            <Col>
              <h1 className="Home_database-title">How it works</h1>
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <div className="Home_database-img">
                <img src={file} alt="startFile" />
                <h4>Step 1</h4>
              </div>
              <div>
                <p className="Home_database-text">
                  Upload your documents to Brella. Upload your documents to
                  Brella. Upload your documents to Brella. Upload your documents
                  to Brella. Upload your documents to Brella. Upload your
                  documents to Brella.
                </p>
              </div>
            </Col>
            <Col md={4}>
              <div className="Home_database-img">
                <img src={person} alt="person" />
                <h4>Step 2</h4>
              </div>
              <p className="Home_database-text">
                Upload your documents to Brella. Upload your documents to
                Brella. Upload your documents to Brella.
              </p>
            </Col>
            <Col md={4}>
              <div className="Home_database-img">
                <img src={completed} alt="completed" />
                <h4>Step 3</h4>
              </div>
              <p className="Home_database-text">
                Upload your documents to Brella. Upload your documents to
                Brella. Upload your documents to Brella.
              </p>
            </Col>
          </Row>
        </Container>

        <div className="Home_get-started">
          <h1 className="">Connect with Brella today</h1>
          <Link to={routeStr} className="btn btn-primary">
            Get Started
          </Link>
        </div>
      </div>
    );
  }
}

export default Home;
