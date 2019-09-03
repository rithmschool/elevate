import React from 'react';
import axios from 'axios'
import { Col, Button, Form, Label, Input, Row} from 'reactstrap';

class ForgotPassword extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      email: '',
      messageFromServer: '',
      showError: false,
    }
    this.handleChange = this.handleChange.bind(this);
    this.sendEmail = this.sendEmail.bind(this);
  }


  handleChange(evt){
		this.setState({ [evt.target.name]: evt.target.value });
  }

  sendEmail(evt){
    evt.preventDefault();
    if(this.state.email === ''){
      this.setState({
        showError: false, messageFromServer: '',
      });
    } else {
      axios.post('http://localhost:3001/forgotpassword', {
        email: this.state.email,
      })
      .then(response => {
        console.log(response.data);
        if(response.data === 'email not in db'){
          this.setState({
            showError: false, messageFromServer: ''
          });
        } else if(response.data === 'recovery email sent'){
            this.setState({
              showError: false,
              messageFromServer: 'recovery email senf',
            });
        }
      })
      .catch(error => {
        console.log(error.data);
      });
    }
  }

  render(){
    const { email, messageFromServer, showError} = this.state;
    return(
      <div>
        <form onSubmit={this.sendEmail}>
        <Row form>
          <Col md={4}>                  
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
          <Col >
            <Button color="info" size="sm"> 
              Send Password Reset Email
            </Button>
        </Col>
        </form>
      </div>
    )
  }
}
export default ForgotPassword;