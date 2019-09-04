import React from 'react';
import ElevateApi from './ElevateApi';
import { Col, Button, Form, Label, Input, Row} from 'reactstrap';
import Alert from "./Alert";
import Spinner from './Spinner';



class ResetPassword extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      userId: null,
      first_name: null,
      email: '',
      password: '',
      confirmPassword: '',
      updated: false,
      isLoading: true,
      errors: [],
    }
    this.handleChange = this.handleChange.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
  }

  handleChange(evt){
		this.setState({ [evt.target.name]: evt.target.value });
  }


  async componentDidMount(){
    //change document title
    document.title = "Reset Password"
    
    try{
      const resetPasswordToken = this.props.match.params.token;
      const response = await ElevateApi.verifyResetPasswordToken(resetPasswordToken);
      console.log(response);

      this.setState({ 
        userId: response.id,
        first_name: response.first_name,
        isLoading: false
        });

    } catch(errors){

      this.setState({errors, isLoading: false})
    }
  }

  async updatePassword(evt){
    evt.preventDefault();

    if(this.state.password !== this.state.confirmPassword){
      this.setState({errors: ["These passwords don't match. Try again?"]})
    }

    try{
      const {userId, password} = this.state;
      await ElevateApi.updatePassword(userId, password)
      this.setState({ errors: [], updated: true });
    } catch(errors){
      this.setState({errors, })
    }
  }
  render(){
    const {isLoading, errors, updated,  password, confirmPassword, first_name} = this.state;
    if(isLoading)
      return <Spinner/>;
      if (errors.length > 0 ) {
        return <Alert type="danger" messages={errors} />
      }

    
    return(
      <div className=" container col-md-6 offset-md-3 col-lg-4 offset-lg-4 border rounded shadow"
        style={{backgroundColor:'#F4F6F8', marginTop: '10%',}}>

        <Form onSubmit={this.updatePassword}> 
        <br/>
        <h3>Hello {first_name}:</h3>
          <h4 style={{textAlign: 'center', fontWeight: 'bold'}}>Choose a new password</h4>
          <hr></hr><br></br>
            <Row form>
                </Row>
                <Row>
              <Col md={12}>
                <Label className="form-group has-float-label">
                <Input onChange={this.handleChange}
                        value={password}
                        type="password" 
                        name="password"
                        id="EditUser-last_name" 
                        />
                <span>Password</span>
                </Label>
              </Col>
              </Row>
              <Row>
              <Col md={12}>
                <Label className="form-group has-float-label">
                <Input onChange={this.handleChange}
                        value={confirmPassword}
                        type="password" name="confirmPassword"
                        id="EditUser-email"
                        />
                <span>Confirm password</span>
                </Label>
              </Col>
            </Row>
            <hr></hr>
            {errors.length > 0 &&
              <Alert type="danger" messages={errors} />}

            { updated &&
              <Alert type="success"
                    messages={["Recovery email sent!"]} />}
        <Col align="center" >
          <Button color="info" size="sm"
            > 
            Reset Password</Button>
        </Col>
        <br></br>
        </Form>
      </div>
    )
  }





}

export default ResetPassword;