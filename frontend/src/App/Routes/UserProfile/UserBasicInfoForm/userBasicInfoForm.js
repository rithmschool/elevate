import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import moment from "moment";
import "../FormStyles.css";
import "./userBasicInfoForm.scss";

/** Update user basic info */
function UserBasicInfoForm(props) {
  const [first_name, setFirstName] = useState(props.first_name);
  const [last_name, setLastName] = useState(props.last_name);
  const [email, setEmail] = useState(props.email);
  const [current_company, setCurrentCompany] = useState(props.current_company);
  const [hire_date, setHireDate] = useState(props.hire_date);
  const [isEdit, setIsEdit] = useState(false);

  return (
    <div
      className={`user-basic-info-form container border rounded shadow pt-5`}
    >
      <Form onSubmit={handleSubmit}>
        <div className="form-styles_flex-space-between">
          <h3>Basic info</h3>

          {!isEdit && (
            <i
              data-testid="turnEditOn"
              className="m-3 fas fa-edit fa-1x"
              onClick={() => setIsEdit(true)}
            ></i>
          )}
        </div>

        <Form.Group>
          <span>First name</span>

          <Form.Control
            onChange={e => setFirstName(e.target.value)}
            id="EditUser-first_name"
            data-testid="firstName"
            name="first_name"
            type="text"
            disabled={!isEdit}
            value={first_name}
          />
        </Form.Group>

        <Form.Group>
          <span>Last name</span>

          <Form.Control
            onChange={e => setLastName(e.target.value)}
            id="EditUser-last_name"
            data-testid="lastName"
            name="last_name"
            type="text"
            disabled={!isEdit}
            value={last_name}
          />
        </Form.Group>

        <Form.Group>
          <span>Email</span>

          <Form.Control
            onChange={e => setEmail(e.target.value)}
            id="EditUser-email"
            data-testid="email"
            name="email"
            type="text"
            disabled={!isEdit}
            value={email}
          />
        </Form.Group>

        <Form.Group>
          <span>Current company</span>

          <Form.Control
            onChange={e => setCurrentCompany(e.target.value)}
            id="EditUser-current_company"
            data-testid="currentCompany"
            name="current_company"
            type="text"
            disabled={!isEdit}
            value={current_company}
          />
        </Form.Group>

        <Form.Group>
          <span>Hire date</span>

          <Form.Control
            onChange={e => setHireDate(e.target.value)}
            id="EditUser-hire_date"
            data-testid="hireDate"
            name="hire_date"
            type="date"
            disabled={!isEdit}
            value={formatHireDate() || ""}
          />
        </Form.Group>

        <div className="row justify-content-center">
          {isEdit && (
            <div>
              <Button className="login-submit mr-3 ml-3" type="submit">
                Submit
              </Button>

              <h6
                className="mr-3 ml-3 form-styles_cancel"
                data-testid="cancel"
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

  function formatHireDate() {
    if (hire_date === null) {
      return null;
    } else {
      return moment(hire_date).format("YYYY-MM-DD");
    }
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    const updatedUser = {
      first_name,
      last_name,
      email,
      current_company,
      hire_date: formatHireDate()
    };

    props.handleUserUpdate(updatedUser, props.userId);
    setIsEdit(false);
  }
}

export default UserBasicInfoForm;
