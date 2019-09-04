import React, { Component } from "react";
import './AdminUserView.css';
import { Table } from 'react-bootstrap';
import ElevateApi from './ElevateApi';


class AdminUserView extends Component {
  handleClickDeleteUser = async () => {
    await ElevateApi.deleteUser(this.props.user.id)
    let users;

    try {
      users = await ElevateApi.getUsers();
    } catch (err) {
      return err;
    }
    this.props.updateUserState(users)
    this.props.changeView("users")
  }
  render() {
    let { first_name,
      last_name,
      email,
      current_company,
      hire_date,
      needs,
      goals,
      questions } = this.props.user;
    if (questions !== undefined) {
      questions = questions.map((question) => {
        return (
          <tr key={question.question_id}>
            <td>{question.question} </td>
            <td>{"" + question.resolved}</td>
            <td>{question.created_date.slice(0, 10)}</td>
          </tr>
        )
      })
    }

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
                <td>{hire_date && hire_date.slice(0, 10)}</td>
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
        <button id="delete-click"
          onClick={(e) => {
            if (window.confirm('Are you sure you want to delete this user?'))
              this.handleClickDeleteUser(e)
          }}>Delete
        </button>
      </div>
    )
  }
}

export default AdminUserView;