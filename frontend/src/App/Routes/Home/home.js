import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Image } from "react-bootstrap";

import "./home.scss";
import Footer from "./Footer/footer";

import fitting_pieces from "./img/undraw_fitting_pieces_cli3.svg";
import road_sign from "./img/undraw_road_sign_mfpo.svg";
import stand_out from "./img/undraw_stand_out.svg";
import offer_letter from "./img/undraw_google_docs_jf93.svg";
import solution from "./img/undraw_our_solution_htvp.svg";
import work_together from "./img/undraw_work_together_h63l.svg";

class Home extends React.Component {
  render() {
    const routeStr = localStorage.token ? "/ask-an-expert" : "/login";
    return (
      <div>
        {/* Hero Section */}
        <Container fluid className="section Home_hero">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none">
            <polygon fill="white" points="0,00 31,100 100,0 100,100 0,100" />
          </svg>
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
                  Your career is personal,
                  <span className="color-emphasis font-weight-bold font-italic">
                    {" "}
                    so why isn’t your support?
                  </span>
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
            <Col className="title-container">
              <h1 className="display-4">The Brella Experience</h1>
            </Col>
          </Row>
          <Row>
            <Col md={4} className="col-container">
              <div className="img-container">
                <Image src={offer_letter} alt="offer letter" />
              </div>
              <div className="content-container">
                <h4>Understand your offer letter</h4>
                <p className="lead">
                  Receive a report with an analysis of your offer, outstanding information,market
                  salary data, and next steps.
                </p>
              </div>
            </Col>
            <Col md={4} className="col-container">
              <div className="img-container">
                <Image src={solution} alt="take action" />
              </div>
              <div className="content-container">
                <h4>Take Action</h4>
                <p className="lead">
                  Partner with your Brella team to create a plan to help you get the offer you
                  deserve.
                </p>
              </div>
            </Col>
            <Col md={4} className="col-container">
              <div className="img-container">
                <Image src={work_together} alt="continued support" />
              </div>
              <div className="content-container">
                <h4>Continued support</h4>
                <p className="lead">
                  Work with our coaches to manage and grow your career and your compensation.
                </p>
              </div>
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
