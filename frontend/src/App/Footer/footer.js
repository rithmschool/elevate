import React from "react";
import {
  Button,
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import { Link } from "react-router-dom";
import './footer.css';

class Footer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: ""
    };
  }

  handleChange = evt => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  render() {
    return (
      <div className="footer-container">
        <Container>
          <Row>
            <Col>
              <h6>Stay up to date with Brella</h6>
              <Form inline>
                <FormGroup>
                  <Label for="newsletter-email" hidden>
                    newsletter email
                  </Label>
                  <Input
                    type="text"
                    id="newsletter-email"
                    name="email"
                    placeholder="Email Address"
                    value={this.state.email}
                    onChange={this.handleChange}
                  />
                </FormGroup>
                <Button>Sign Up</Button>
              </Form>
            </Col>
            <Col>
              <Link className="link link-ltr" to="/ask-an-expert">Blog</Link>
              <br></br>
              <Link className="link link-ltr" to="/ask-an-expert">Contact</Link>
              <br></br>
              <Link className="link link-ltr" to="/ask-an-expert">Facebook</Link>
              <br></br>
              <Link className="link link-ltr" to="/ask-an-expert">Instagram</Link>
              <br></br>
              <Link className="link link-ltr" to="/ask-an-expert">Twitter</Link>
              <br></br>
            </Col>
            <Col>
              <Link className="footer-brand-name" to="/">
                Elevate
              </Link>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Footer;
