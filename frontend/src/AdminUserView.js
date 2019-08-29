import React, { Component } from "react";
import './AdminUserView.css';
import { Table } from 'react-bootstrap';

class AdminUserView extends Component {
  render() {
    let { first_name, last_name, email, current_company, hire_date, needs, goals, questions } = this.props.user;
    questions = questions.map((question) => {
      return (
        <tr key={question.question_id}>
          <td>{question.question} </td>
          <td>{"" + question.resolved}</td>
          <td>{question.created_date.slice(0, 10)}</td>
        </tr>
      )
    })
    return (
      <div className='AdminUserView'>
        <div>
          <h4>{first_name} {last_name}</h4>
          <table>
            <tbody>
              <tr>
                <td><b>Email:</b></td>
                <td>{email}</td>
              </tr>
              <tr>
                <td><b>Company:</b></td>
                <td>{current_company}</td>
              </tr>
              <tr>
                <td><b>Hire Date:</b></td>
                <td>{hire_date.slice(0, 10)}</td>
              </tr>
              <tr>
                <td><b>Needs:</b></td>
                <td>{needs}</td>
              </tr>
              <tr>
                <td><b>Goals:</b></td>
                <td>{goals}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p><b>Questions:</b></p>
        <Table striped bordered hover size="sm" responsive id="questions-table">
          <thead>
            <tr>
              <th>Question</th>
              <th>Resolved</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {questions}
          </tbody>
        </Table>
      </div>
    )
  }
}

export default AdminUserView;