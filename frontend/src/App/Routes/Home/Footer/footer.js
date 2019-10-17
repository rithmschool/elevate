import React from "react";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import { Link } from "react-router-dom";
import "./footer.css";
import ElevateApi from "../../../../elevateApi";

class Footer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      signedUp: false
    };
  }

  handleChange = evt => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  handleSubmit = async evt => {
    evt.preventDefault();
    await ElevateApi.postNewsletterSignUp(this.state);
    this.setState({
      email: "",
      signedUp: true
    });
  };

  render() {
    return (
      <div className="Footer">
        <Container>
          <Row>
            <Col className="d-flex flex-column justify-content-center">
              {this.state.signedUp ? (
                <h6>Thanks for signing up!</h6>
              ) : (
                <div>
                  <h6>Stay up to date with Brella</h6>
                  <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                      <Label for="email" hidden>
                        newsletter email
                      </Label>
                      <Input
                        type="text"
                        id="email"
                        name="email"
                        placeholder="Email Address"
                        value={this.state.email}
                        onChange={this.handleChange}
                      />
                    </FormGroup>
                  </Form>
                </div>
              )}
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
