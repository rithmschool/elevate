import React from 'react';
import { Col, Button, Form, Label, Input, Row} from 'reactstrap';
import moment from 'moment';



/** Update user basic info */

class UserBasicInfoForm extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      first_name: this.props.first_name,
      last_name: this.props.last_name,
      email: this.props.email,
      current_company: this.props.current_company || '',
      hire_date: moment(this.props.hire_date).format('YYYY-MM-DD'),
      isEdit: false,
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this)
  }
 // toggle edit form
  toggleEdit(){
    this.setState({
      isEdit: !this.state.isEdit
    });
  }

 // sync state values with inputs values
  handleChange(evt){
		this.setState({ [evt.target.name]: evt.target.value });
  }
  
  handleSubmit(evt){
    evt.preventDefault()
    //update user basic info
    const updatedUser = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      current_company: this.state.current_company,
      hire_date: this.state.hire_date
    }
    this.props.handleUserUpdate(updatedUser, this.props.userId);
    this.setState({isEdit: false})

  }
  
  render() {
    const isEdit = this.state.isEdit
    return (
      <div className="EditPUserForm container border rounded"
        style={{backgroundColor:'#F4F6F8'}}>
        <Row>
          <Col md={6}>
            <p >Basic info</p>
          </Col>
          <Col align="right" md={6} sm={{ size: 8, offset: 0}}>
          <i className="fas fa-edit text-info"
            onClick={this.toggleEdit} 
            style={{cursor: 'pointer', fontSize: '1.1em', marginTop: '1em' }}></i>
          </Col>
        </Row>

        <hr></hr>        
      <Form onSubmit={this.handleSubmit}> 
        <Row form>
          <Col md={4}>                  
            <Label className="form-group has-float-label">
              <Input onChange={this.handleChange}
                    value={this.state.first_name}
                    type="text"
                    name="first_name"
                    id="EditUser-first_name"
                    disabled={!isEdit}  />
              <span>First name</span>
            </Label>
            </Col>
          <Col md={4}>
            <Label className="form-group has-float-label">
            <Input onChange={this.handleChange}
                    value={this.state.last_name}
                    type="text" name="last_name"
                    id="EditUser-last_name" 
                    disabled={!isEdit}/>
            <span>Last name</span>
            </Label>
          </Col>
          <Col md={4}>
            <Label className="form-group has-float-label">
            <Input onChange={this.handleChange}
                    value={this.state.email}
                    type="email" name="email"
                    id="EditUser-email"
                    disabled={!isEdit}/>
            <span>Email</span>
            </Label>
          </Col>
        </Row>
        <Row form> 
        <Col md={6}>
            <Label className="form-group has-float-label">  
            <Input onChange={this.handleChange}
                    value={this.state.current_company}
                    type="text" name="current_company"
                    id="EditUser-current_company" 
                    disabled={!isEdit}/>
            <span>Current company</span>
            </Label>
          </Col> 
          <Col md={6}>
            <Label className="form-group has-float-label"> 
            <Input onChange={this.handleChange}
                    value={this.state.hire_date}
                    type="date" name="hire_date"
                    id="EditUser-hire_date"
                    disabled={!isEdit}
                    />
            <span>Hire date</span>
            </Label>
          </Col>
          </Row>

        <Col align="left" >
          <Button color="info" size="sm"
            disabled={!isEdit}> 
            Save</Button>
        </Col>
        <br/>     
    </Form>
    </div>
    )
  }
}



export default UserBasicInfoForm;
