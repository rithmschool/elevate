import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./footer.css";
import NewsletterSignUpForm from "./NewsletterSignUpForm/newsletterSignUpForm";

class Footer extends React.Component {
  render() {
    return (
      <div className="Footer">
        <Container fluid={true}>
          <Row>
            <Col className="d-flex flex-column justify-content-center">
              <NewsletterSignUpForm />
            </Col>
            <Col style={{ display: "flex", flexDirection: "column" }}>
              <Link to="/ask-an-expert">Blog</Link>
              <Link to="/ask-an-expert">Contact</Link>
              <Link to="/ask-an-expert">Facebook</Link>
              <Link to="/ask-an-expert">Instagram</Link>
              <Link to="/ask-an-expert">Twitter</Link>
            </Col>
            <Col className="d-flex align-items-center justify-content-end">
              <Link className="brand-logo" to="/">
                Brella
              </Link>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Footer;
