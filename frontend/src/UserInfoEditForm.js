import React from 'react';
import { Col, Button, Form, Label, Input, Row} from 'reactstrap';
import './UserInfoEditForm.css';
import moment from 'moment';

class UserInfoEditForm extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      first_name: this.props.first_name,
      last_name: this.props.last_name,
      email: this.props.email,
      current_company: this.props.current_company,
      salary: this.props.salary, 
      hire_date: moment(this.props.hire_date).format('YYYY-MM-DD'),
      isEdit : true
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this)
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
      hire_date: this.state.hire_date
    }
    this.props.handleUpdate(updatedUser, this.props.userId);

    const salary = this.state.salary;
    this.props.handleSalaryUpdate(this.props.userId, salary);

    this.toggleEdit()

  }
  toggleEdit(){
    this.setState({
      isEdit: !this.state.isEdit
    });
  }

  render() {
    return (
      <div className="EditPUserForm container border rounded"
        style={{backgroundColor:'#F4F6F8'}}>
        <Row>
          <Col md={6}>
            <h3 className="text-info">User information</h3>
          </Col>
          <Col align="right" md={6} sm={{ size: 8, offset: 0}}>
          <i class="fas fa-user-edit text-info" onClick={this.toggleEdit} style={{cursor: 'pointer' }}></i>
          </Col>
        </Row>

        <hr></hr>        
      <Form onSubmit={this.handleSubmit}> 
        <Row form>
          <Col md={6}>                  
            <Label className="form-group has-float-label">
              <Input onChange={this.handleChange}
                    value={this.state.first_name}
                    type="text"
                    name="first_name"
                    id="EditUser-first_name"
                    disabled={this.state.isEdit}  />
              <span>First name</span>
            </Label>
            </Col>
          <Col md={6}>
            <Label className="form-group has-float-label">
            <Input onChange={this.handleChange}
                    value={this.state.last_name}
                    type="text" name="last_name"
                    id="EditUser-last_name" 
                    disabled={this.state.isEdit}/>
            <span>Last name</span>
            </Label>
          </Col>
        </Row>
        <Row form>
          <Col md={6}>
            <Label className="form-group has-float-label">
            <Input onChange={this.handleChange}
                    value={this.state.email}
                    type="email" name="email"
                    id="EditUser-email"
                    disabled={this.state.isEdit}/>
            <span>Email</span>
            </Label>
          </Col>

          <Col md={6}>
            <Label className="form-group has-float-label">  
            <Input onChange={this.handleChange}
                    value={this.state.current_company}
                    type="text" name="current_company"
                    id="EditUser-current_company" 
                    disabled={this.state.isEdit}/>
            <span>Current company</span>
            </Label>
          </Col>

        </Row>
        <Row form> 
          <Col md={6}>
            <Label className="form-group has-float-label"> 
            <Input onChange={this.handleChange}
                    value={this.state.salary}
                    type="number" name="salary"
                    id="EditUser-salary" 
                    disabled={this.state.isEdit}/>
            <span>salary</span>
            </Label>
          </Col>
          <Col md={6}>
            <Label className="form-group has-float-label"> 
            <Input onChange={this.handleChange}
                    value={this.state.hire_date}
                    type="date" name="hire_date"
                    id="EditUser-hire_date"
                    disabled={this.state.isEdit}
                    />
            <span>Hiring date</span>
            </Label>
          </Col>
        </Row>
      <hr></hr>
        <Col align="left" >
          <p className="text-primary">{this.props.updateStatus}</p>
          <Button color="info" size="sm"
            disabled={this.state.isEdit}> 
            Save details</Button>
        </Col>
        <br></br>
      </Form>
    </div>
    )
  }
}



export default UserInfoEditForm;

     