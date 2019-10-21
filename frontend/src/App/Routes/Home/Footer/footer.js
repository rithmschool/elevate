import React from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import "./footer.css";
import NewsletterSignUpForm from "./NewsletterSignUpForm/newsletterSignUpForm";

class Footer extends React.Component {
  render() {
    return (
      <div className="Footer">
        <Container>
          <Row>
            <Col className="d-flex flex-column justify-content-center">
              <NewsletterSignUpForm />
            </Col>
            <Col>
              <Link to="/ask-an-expert">Blog</Link>
              <br></br>
              <Link to="/ask-an-expert">Contact</Link>
              <br></br>
              <Link to="/ask-an-expert">Facebook</Link>
              <br></br>
              <Link to="/ask-an-expert">Instagram</Link>
              <br></br>
              <Link to="/ask-an-expert">Twitter</Link>
              <br></br>
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
