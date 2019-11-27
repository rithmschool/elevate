import React, { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import "../FormStyles.css";
import "./userSalaryInfoForm.scss";

/** Update user salary */
function UserSalaryInfoForm(props) {
  const [salary, setSalary] = useState(props.salary);
  const [bonus, setBonus] = useState(props.bonus);
  const [equity, setEquity] = useState(props.equity);
  const [isEdit, setIsEdit] = useState(false);

  return (
    <div className="user-salary-form container border shadow rounded mb-5">
      <Form onSubmit={handleSubmit} className="mt-5">
        <div className="form-styles_flex-space-between">
          <h3>Salary info</h3>

          {!isEdit && (
            <i
              data-testid="turnEditOn"
              className="m-3 fas fa-edit fa-1x"
              onClick={() => setIsEdit(true)}
            ></i>
          )}
        </div>

        <Form.Group>
          <Form.Label>Salary</Form.Label>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text>$</InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              data-testid="salary"
              onChange={e => setSalary(e.target.value)}
              id="EditUser-salary"
              name="salary"
              type="number"
              step="5000"
              disabled={!isEdit}
              value={salary}
            />
          </InputGroup>
        </Form.Group>

        <Form.Group>
          <Form.Label>Equity</Form.Label>

          <Form.Control
            data-testid="equity"
            onChange={e => setEquity(e.target.value)}
            id="EditUser-equity"
            name="equity"
            type="number"
            step="0.001"
            disabled={!isEdit}
            value={equity}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Bonus</Form.Label>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text>$</InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              data-testid="bonus"
              onChange={e => setBonus(e.target.value)}
              id="EditUser-bonus"
              name="bonus"
              type="number"
              step="500"
              disabled={!isEdit}
              value={bonus}
            />
          </InputGroup>
        </Form.Group>

        <div className="row justify-content-center">
          {isEdit && (
            <div>
              <Button
                id="userSalaryBtn"
                className="login-submit mr-3 ml-3"
                type="submit"
              >
                Submit
              </Button>

              <h6
                data-testid="cancel"
                className="mr-3 ml-3 form-styles_cancel"
                onClick={() => setIsEdit(false)}
              >
                Cancel
              </h6>
            </div>
          )}
        </div>
      </Form>
    </div>
  );

  function handleSubmit(evt) {
    evt.preventDefault();

    const updatedSalary = {
      user_id: props.user_id,
      salary,
      bonus,
      equity
    };

    props.handleSalaryUpdate(updatedSalary);
    setIsEdit(false);
  }
}

export default UserSalaryInfoForm;
