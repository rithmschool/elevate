import React from "react";
import { Col, Button, Form, Label, Input, Row } from "reactstrap";

/** Update user salary */

class UserSalaryInfoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: this.props.user_id,
      salary: this.props.salary,
      bonus: this.props.bonus,
      equity: this.props.equity,
      isEdit: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
  }

  // toggle edit form
  toggleEdit() {
    this.setState(state => ({ isEdit: !state.isEdit }));
  }

  // sync state values with inputs values
  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  handleSubmit(evt) {
    evt.preventDefault();

    //update salary
    const salary = {
      user_id: this.props.userId,
      salary: this.state.salary,
      bonus: this.state.bonus,
      equity: this.state.equity
    };
    this.props.handleSalaryUpdate(salary);
    this.setState({ isEdit: false });
  }

  render() {
    const isEdit = this.state.isEdit;
    return (
      <div
        className="EditPUserForm container border rounded"
        style={{ backgroundColor: "#F4F6F8" }}
      >
        <Row>
          <Col md={6}>
            <p>Salary info</p>
          </Col>
          <Col align="right" md={6} sm={{ size: 8, offset: 0 }}>
            <i
              className="fas fa-edit text-info"
              onClick={this.toggleEdit}
              style={{ cursor: "pointer", fontSize: "1.1em", marginTop: "1em" }}
            ></i>
          </Col>
        </Row>

        <hr></hr>
        <Form onSubmit={this.handleSubmit}>
          <br></br>
          <Row form>
            <Col md={4}>
              <Label className="form-group has-float-label">
                <Input
                  onChange={this.handleChange}
                  value={this.state.salary}
                  type="number"
                  name="salary"
                  step="10000"
                  id="EditUser-salary"
                  disabled={!isEdit}
                />
                <span>salary</span>
              </Label>
            </Col>
            <Col md={4}>
              <Label className="form-group has-float-label">
                <Input
                  onChange={this.handleChange}
                  value={this.state.equity}
                  type="number"
                  name="equity"
                  step="0.1"
                  id="EditUser-salary"
                  disabled={!isEdit}
                />
                <span>Equity</span>
              </Label>
            </Col>
            <Col md={4}>
              <Label className="form-group has-float-label">
                <Input
                  onChange={this.handleChange}
                  value={this.state.bonus}
                  type="number"
                  name="bonus"
                  step="100"
                  id="EditUser-salary"
                  disabled={!isEdit}
                />
                <span>Bonus</span>
              </Label>
            </Col>
          </Row>

          <Col align="left">
            <Button color="info" size="sm" disabled={!isEdit}>
              Save
            </Button>
          </Col>
          <br />
        </Form>
      </div>
    );
  }
}

export default UserSalaryInfoForm;
