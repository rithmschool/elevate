import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Image } from "react-bootstrap";

import "./home.scss";
import Footer from "./Footer/footer";

import file from "./img/files.png";
import person from "./img/person.png";
import completed from "./img/completed.png";
import fitting_pieces from "./img/undraw_fitting_pieces_cli3.svg";
import road_sign from "./img/undraw_road_sign_mfpo_alt.svg";
import stand_out from "./img/undraw_stand_out.svg";

class Home extends React.Component {
  render() {
    const routeStr = localStorage.token ? "/ask-an-expert" : "/login";
    return (
      <div>
        {/* Hero Section */}
        <Container fluid className="section Home_hero">
          <Row>
            <Col md={6} className="p-4">
              <div className="img-container">
                <Image fluid src={fitting_pieces} alt="fitting pieces" />
              </div>
            </Col>
            <Col md={6} className="content-container mb-3">
              <div className="hero-content">
                <h1>Your guide to your career</h1>
                <p className="lead my-3">
                  We all need help managing our careers. We got you covered.
                </p>
              </div>
              <Link to={routeStr} className="btn btn-primary">
                Get Started
              </Link>
            </Col>
          </Row>
        </Container>

        {/* SECTION - TEMPLATE - WHY BRELLA */}
        <Container fluid className="section Home_template p-5">
          <Row>
            <Col md={6} className="content-container mb-3">
              <div>
                <h1>Why Brella?</h1>
                <p className="my-4 lead">
                  Everything about your career is personal, so why isn’t your support?
                </p>
                <p className="lead">
                  We take the stress out of finding trustworthy, affordable advice by providing you
                  tools and experts to help you advance in your career. Wherever your career takes
                  you, your Brella team goes with you — we’re tied to you, not your employer.
                </p>
              </div>
            </Col>
            <Col md={6}>
              <div className="img-container">
                <Image fluid src={stand_out} alt="stand out" />
              </div>
            </Col>
          </Row>
        </Container>

        {/* SECTION - Database */}
        <Container fluid className="Home_database p-5">
          <Row>
            <Col>
              <h1 className="Home_database-title">The Brella Experience</h1>
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <div className="Home_database-img-container">
                <img src={file} alt="startFile" />
                <h4>Understand your offer letter</h4>
              </div>
              <div>
                <p className="Home_database-text lead">
                  Receive a report with an analysis of your offer, outstanding information, market
                  salary data, and next steps.
                </p>
              </div>
            </Col>
            <Col md={4}>
              <div className="Home_database-img-container">
                <img src={person} alt="person" />
                <h4>Take Action</h4>
              </div>
              <p className="Home_database-text lead">
                Partner with your Brella team to create a plan to help you get the offer you
                deserve.
              </p>
            </Col>
            <Col md={4}>
              <div className="Home_database-img-container">
                <img src={completed} alt="completed" />
                <h4>Continued support</h4>
              </div>
              <p className="Home_database-text lead">
                Work with our coaches to manage and grow your career and your compensation.
              </p>
            </Col>
          </Row>
        </Container>

        {/* SECTION - GET STARTED */}
        <Container fluid className="section Home_get-started">
          <Row className="p-5">
            <Col md={6} className="p-4">
              <div className="img-container">
                <Image fluid src={road_sign} alt="road sign" />
              </div>
            </Col>
            <Col md={6} className="content-container cta p-4 rounded-lg shadow-lg">
              <div>
                <h2>Unsure if you’re getting paid what you deserve?</h2>
                <p className="lead">
                  We believe you have a right to know. We’re on a mission to{" "}
                  <b>increase pay transparency</b> — and we need your help. Share your offer letter,
                  and we’ll share benchmark data with you as soon as we have it.
                </p>
              </div>
              <Link to={routeStr} className="btn btn-primary">
                Share your offer letter
              </Link>
            </Col>
          </Row>
        </Container>
        {/* FOOTER */}
        <Footer />
      </div>
    );
  }
}

export default Home;
