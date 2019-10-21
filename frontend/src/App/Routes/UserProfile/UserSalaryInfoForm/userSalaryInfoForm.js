import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import "../FormStyles.css";

/** Update user salary */
function UserSalaryInfoForm(props) {
  const [salary, setSalary] = useState(props.salary);
  const [bonus, setBonus] = useState(props.bonus);
  const [equity, setEquity] = useState(props.equity);
  const [isEdit, setIsEdit] = useState(false);

  return (
    <div
      className='EditPUserForm container border rounded'
      style={{ backgroundColor: "#F4F6F8" }}>
      <div className='form-inside-container mt-5'>
        <Form onSubmit={handleSubmit}>
          <div className='form-styles_flex-space-between'>
            <h3>Salary info</h3>

            {!isEdit && (
              <i
                className='m-3 fas fa-edit fa-1x'
                onClick={() => setIsEdit(true)}></i>
            )}
          </div>

          <Form.Group>
            <span>Salary</span>

            <Form.Control
              onChange={e => setSalary(e.target.value)}
              id='EditUser-salary'
              name='salary'
              type='number'
              step='5000'
              disabled={!isEdit}
              value={salary}
            />
          </Form.Group>

          <Form.Group>
            <span>Equity</span>

            <Form.Control
              onChange={e => setEquity(e.target.value)}
              id='EditUser-equity'
              name='equity'
              type='number'
              step='0.001'
              disabled={!isEdit}
              value={equity}
            />
          </Form.Group>

          <Form.Group>
            <span>Bonus</span>

            <Form.Control
              onChange={e => setBonus(e.target.value)}
              id='EditUser-bonus'
              name='bonus'
              type='number'
              step='500'
              disabled={!isEdit}
              value={bonus}
            />
          </Form.Group>

          <div className='row justify-content-center'>
            {isEdit && (
              <div>
                <Button id="userSalaryBtn" className='login-submit mr-3 ml-3' type='submit'>
                  Submit
                </Button>

                <h6
                  className='mr-3 ml-3 form-styles_cancel'
                  onClick={() => setIsEdit(false)}>
                  Cancel
                </h6>
              </div>
            )}
          </div>
        </Form>
      </div>
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
