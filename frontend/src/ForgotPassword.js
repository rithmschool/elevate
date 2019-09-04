import React from 'react';
import ElevateApi from './ElevateApi';
import { Col, Button, Form, Label, Input, Row} from 'reactstrap';
import Alert from "./Alert";



class ForgotPassword extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      email: '',
      errors: [],
      emailSent: false,
    }
    this.handleChange = this.handleChange.bind(this);
    this.sendEmail = this.sendEmail.bind(this);
  }


  handleChange(evt){
		this.setState({ [evt.target.name]: evt.target.value });
  }

  
  componentDidMount(){
    //change document title
    document.title = "Forgot password"
  }

  async sendEmail(evt){
    evt.preventDefault();
    if(this.state.email === ''){
      this.setState({ errors: ['Please enter your email address!']});
    } 
    else {
      try{
        await ElevateApi.forgotPassword({ email: this.state.email });
        console.log('hereeeeeeeee11111')
        this.setState({ errors: [], emailSent: true });
        console.log('hereeeeeeeee11111')

      }
      catch(errors){
        this.setState({ errors });
      }
    }
  }

  render(){
    const { email, errors, emailSent} = this.state;

    return(
      <div className=" container col-md-6 offset-md-3 col-lg-4 offset-lg-4 border rounded shadow"
        style={{backgroundColor:'#F4F6F8', marginTop: '10%',}}>

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
                    id="EditUser-first_name"
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
                    messages={["Recovery email sent!"]} />}

          <Col align="center" >
            <Button color="info" size="sm"
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