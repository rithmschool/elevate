import React from "react";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import Image from "react-bootstrap/Image";

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
              <div className="Home_template_child">
                <img className="card-img" src={img1} alt="working" />
              </div>
            </Col>
            <Col md={6}>
              <div className="Home_template_child">
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
            <Col xs={6} md={4}>
              <p>
                Upload your documents to Brella. Upload your documents to
                Brella. Upload your documents to Brella.
              </p>
            </Col>
            <Col xs={6} md={4}>
              <p>
                Upload your documents to Brella. Upload your documents to
                Brella. Upload your documents to Brella.
              </p>
            </Col>
            <Col xs={6} md={4}>
              <p>
                Upload your documents to Brella. Upload your documents to
                Brella. Upload your documents to Brella.
              </p>
            </Col>
          </Row>
        </Container>
        {/* <div className="Home_database">
          <div className="col-sm-4">
            <img className="img-thumbnail mx-auto d-block" src={file} alt="image1"  />
            <h3 className="text-center">Step 1</h3>
            <p className="text">
              Upload your documents to Brella.
              Upload your documents to Brella.
              Upload your documents to Brella.
            </p>
          </div>
       
          <div className="col-sm-4">
            <img className="img-thumbnail mx-auto d-block" src={person} alt="image1"  />
            <h3 className="text-center">Step 2</h3>
            <p className="text">
              Upload your documents to Brella.
              Upload your documents to Brella.
              Upload your documents to Brella.
            </p>
          </div>
       
          <div className="col-sm-4">
            <img className="img-thumbnail mx-auto d-block" src={completed} alt="image1"  />
            <h3 className="text-center">Step 3</h3>
            <p className="text">
              Upload your documents to Brella.
              Upload your documents to Brella.
              Upload your documents to Brella.
            </p>
          </div>
       
        </div> */}

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

        {/* <div className="Home_get-started">
          <h2 className="">Get Started Today</h2>

          <Link to="/ask-an-expert">
            <Button color="primary">Ask An Expert</Button>
          </Link>
        </div> */}
      </div>
    );
  }
}

export default Home;
