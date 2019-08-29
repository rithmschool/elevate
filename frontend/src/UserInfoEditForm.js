import React from 'react';
import { Col, Button, Form, FormGroup, Label, Input} from 'reactstrap';

class UserInfoEditForm extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      first_name: this.props.first_name || '',
      last_name: this.props.last_name,
      email: this.props.email,
      current_company: this.props.current_company,
      salary: this.props.salary,
      hire_date: this.props.hire_date
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this)
  }
 
  handleCancel(){
    return this.props.toggleEditForm();
  }
  handleChange(evt){
		this.setState({ [evt.target.name]: evt.target.value });
  }
  
  handleSubmit(evt){
    evt.preventDefault()
    const updatedUser = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      current_company: this.state.current_company,
      salary: this.state.salary,
      hire_date: this.state.hire_date
    }
    this.props.handleUpdate(updatedUser,this.props.userId)
    this.setState({ title: '', description: '', body: ''})
    this.props.toggleEditForm()

  }

  render() {
    return (
      <div className="EditPUserForm container">
        <h2>Edit Info</h2>
           <Form onSubmit={this.handleSubmit}> 
        <FormGroup row>
          <Col sm={10}>
            <Label for="EditUser-first_name">First name:</Label>
              <Input onChange={this.handleChange}
                    value={this.state.first_name}
                    type="text"
                    name="first_name"
                    id="EditUser-first_name"  />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col sm={10} >
            <Label for="EditUser-last_name">Last name:</Label>
            <Input onChange={this.handleChange}
                    value={this.state.last_name}
                    type="text" name="last_name"
                    id="EditUser-last_name" />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Col sm={10} >
            <Label for="EditUser-email">Email:</Label>
            <Input onChange={this.handleChange}
                    value={this.state.email}
                    type="email" name="email"
                    id="EditUser-email" />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Col sm={10} >
            <Label for="EditUser-current_company">Current company:</Label>
            <Input onChange={this.handleChange}
                    value={this.state.current_company}
                    type="text" name="current_company"
                    id="EditUser-current_company" />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Col sm={10} >
            <Label for="EditUser-salary">Salary:</Label>
            <Input onChange={this.handleChange}
                    value={this.state.salary}
                    type="number" name="salary"
                    id="EditUser-salary" />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Col sm={10} >
            <Label for="EditUser-hire_date">Hiring date:</Label>
            <Input onChange={this.handleChange}
                    value={this.state.hire_date}
                    type="date" name="hire_date"
                    id="EditUser-hire_date" />
          </Col>
        </FormGroup>

        <FormGroup check row>
        <Col align="right" sm={{ size: 10, offset: 0}}>
          <Button
          color="success"

          >Submit
          </Button> {' '}
          <Button
            onClick={this.handleCancel}>Cancel</Button>
          </Col>
        </FormGroup>
      </Form>
    </div>
    )
  }
}



export default UserInfoEditForm;

     