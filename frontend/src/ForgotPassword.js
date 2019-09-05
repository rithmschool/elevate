import React from 'react';
import ElevateApi from './ElevateApi';
import { Col, Button, Form, Label, Input, Row} from 'reactstrap';
import Alert from "./Alert";
import './ForgotPassword.css'



class ForgotPassword extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      email: '',
      errors: [],
      msgFromServer: [],
      emailSent: false,
    }
    this.handleChange = this.handleChange.bind(this);
    this.sendEmail = this.sendEmail.bind(this);
  }

  // handle input change
  handleChange(evt){
		this.setState({
      [evt.target.name]: evt.target.value,
       emailSent: false,
       errors: [],
      });
  }

  
  componentDidMount(){
    //change document title
    document.title = "Forgot password"
  }

  // verify if user entred its email and send  it to backend and then handle response
  async sendEmail(evt){
    evt.preventDefault();
    if(this.state.email === ''){
      this.setState({ errors: ['Please enter your email address!']});
    } 
    else {
      try{
        let response = await ElevateApi.forgotPassword({ email: this.state.email });
        this.setState({
          errors: [],
          emailSent: true,
          msgFromServer: [response.message]
        });
      }
      catch(errors){
        this.setState({ errors });
      }
    }
  }

  render(){
    const { email, errors, emailSent} = this.state;

    return(
      <div className=" container col-md-6 offset-md-3 col-lg-4 offset-lg-4 border rounded shadow ForgotPassword-container">
      <Form onSubmit={this.sendEmail}>
        <br></br><br></br>
        <div style={{textAlign: 'center'}}>
          <h3>Forgot Password</h3>
         <p>Please enter your email address and we'll send you instructions on how to reset your password</p>
        </div>
          <hr></hr><br></br>
        <Row form>
          <Col md={12}>                  
            <Label className="form-group has-float-label">
              <Input onChange={this.handleChange}
                    value={email}
                    type="email"
                    name="email"
                    id="forgt-email"
                    />
              <span>Email</span>
            </Label>
            </Col>
          </Row>
          <hr></hr>

          {errors.length > 0 &&
              <Alert type="danger" messages={errors} />}

            { emailSent &&
              <Alert type="success"
                    messages={this.state.msgFromServer} />}

          <Col align="center" >
            <Button size="sm"
            className="btn btn-info"
              > 
               Send Password Reset Email</Button>
          </Col>
          <br></br>
        </Form>
      </div>
    )
  }
}
export default ForgotPassword;