import React from 'react';
import { Button, Form } from 'react-bootstrap';
import moment from 'moment';
import './FormStyles.css';

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
    this.toggleEditForm = this.toggleEditForm.bind(this)
  }
  
  toggleEditForm() {
    this.setState(state => ({ isEdit: !state.isEdit }));
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

    this.props.handleUserUpdate(updatedUser, this.props.userId);
    this.setState({isEdit: false})
  }
  
  render() {
    const isEdit = this.state.isEdit

    return (
      <div
        className={`container borderrounded shadow`}
        style={{ margin: "10% auto", backgroundColor: "#F4F6F8" }}
      >

        <div className="form-inside-container mt-5">
          <Form onSubmit={ this.handleSubmit }> 
            <div className="form-styles_flex-space-between">
              <h3>Basic info</h3>

              {!isEdit &&
                <i className="m-3 fas fa-edit fa-1x"
                  onClick={this.toggleEditForm}>
                </i>}
            </div>

            <Form.Group>
              <span>First name</span>

              <Form.Control
                onChange={this.handleChange}
                id="EditUser-first_name"
                name="first_name"
                type="text"
                disabled={!isEdit}  
                value={this.state.first_name}
              />
            </Form.Group>

            <Form.Group>
              <span>Last name</span>

              <Form.Control
                onChange={this.handleChange}
                id="EditUser-last_name"
                name="last_name"
                type="text"
                disabled={!isEdit}  
                value={this.state.last_name}
              />
            </Form.Group>

            <Form.Group>
              <span>Email</span>

              <Form.Control
                onChange={this.handleChange}
                id="EditUser-email"
                name="email"
                type="text"
                disabled={!isEdit}  
                value={this.state.email}
              />
            </Form.Group>

            <Form.Group>
              <span>Current company</span>

              <Form.Control
                onChange={this.handleChange}
                id="EditUser-current_company"
                name="current_company"
                type="text"
                disabled={!isEdit}  
                value={this.state.current_company}
              />
            </Form.Group>

            <Form.Group>
              <span>Hire date</span>

              <Form.Control
                onChange={this.handleChange}
                id="EditUser-hire_date"
                name="hire_date"
                type="date"
                disabled={!isEdit}  
                value={this.state.hire_date}
              />
            </Form.Group>

            <div className="row justify-content-center">
              {isEdit &&
                <div>
                  <Button
                    className="login-submit mr-3 ml-3"
                    type="submit">
                    Submit
                  </Button>

                  <h6 
                    className="mr-3 ml-3 form-styles_cancel"
                    onClick={this.toggleEditForm}>
                    Cancel
                  </h6>
                </div>}
            </div>

          </Form>
        </div>
      </div>
    )
  }
}

export default UserBasicInfoForm;
