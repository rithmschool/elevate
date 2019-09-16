import React from "react";
import { Button, Form } from "react-bootstrap";
import "../FormStyles.css";

/** Update user salary */
class UserSalaryInfoForm extends React.Component {
  
  constructor(props){
    super(props);

    this.state = {
      user_id: this.props.user_id,
      salary: this.props.salary, 
      bonus: this.props.bonus,
      equity: this.props.equity,
      isEdit: false,
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleEditForm = this.toggleEditForm.bind(this)
  }

  toggleEditForm() {
    this.setState(state => ({isEdit: !state.isEdit }));
  }

  handleChange(evt){
		this.setState({ [evt.target.name]: evt.target.value });
  }
  
  handleSubmit(evt){
    evt.preventDefault()
   
    const salary = {
      user_id: this.state.user_id,
      salary: this.state.salary,
      bonus: this.state.bonus,
      equity: this.state.equity
    };

    this.props.handleSalaryUpdate(salary);
    this.setState({isEdit: false})
  }
  
  render() {
    const isEdit = this.state.isEdit

    return (
      <div 
        className="EditPUserForm container border rounded"
        style={{backgroundColor:'#F4F6F8'}}
      >

        <div className="form-inside-container mt-5">
          <Form onSubmit={ this.handleSubmit }> 
            <div className="form-styles_flex-space-between">
              <h3>Salary info</h3>

              {!isEdit &&
                <i className="m-3 fas fa-edit fa-1x"
                  onClick={this.toggleEditForm}>
                </i>}
            </div>

            <Form.Group>
              <span>First name</span>

              <Form.Control
                onChange={this.handleChange}
                id="EditUser-salary"
                name="salary"
                type="number"
                step="5000"
                disabled={!isEdit}  
                value={this.state.salary}
              />
            </Form.Group>

            <Form.Group>
              <span>Equity</span>

              <Form.Control
                onChange={this.handleChange}
                id="EditUser-equity"
                name="equity"
                type="number"
                step="0.001"
                disabled={!isEdit}  
                value={this.state.equity}
              />
            </Form.Group>

            <Form.Group>
              <span>Bonus</span>

              <Form.Control
                onChange={this.handleChange}
                id="EditUser-bonus"
                name="bonus"
                type="number"
                step="500"
                disabled={!isEdit}  
                value={this.state.bonus}
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

export default UserSalaryInfoForm;
