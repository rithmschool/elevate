import React from "react";
import { withRouter } from "react-router-dom";
import "./adminUserView.css";
import ElevateApi from "../../../../elevateApi";

class AdminUserView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
    this.getUserDetail = this.getUserDetail.bind(this);
  }

  async componentDidMount() {
    const user = await this.getUserDetail();
    this.setState({ user });
  }

  handleClickDeleteUser = async () => {
    await ElevateApi.deleteUser(this.props.user.id);
    let users;

    try {
      users = await ElevateApi.getUsers();
    } catch (err) {
      console.log(err);
      return err;
    }
    this.props.updateUserState(users);
    this.props.changeView("users");
  };

  async getUserDetail() {
    const userId = this.props.match.params.userId;
    const user = await ElevateApi.getUser(userId);
    return user;
  }

  render() {
    const {
      first_name,
      last_name,
      email,
      current_company,
      hire_date,
      needs,
      goals
    } = this.state.user;

    return (
      <div className="adminUserView_div">
        <div>
          <h4>
            {first_name} {last_name}
          </h4>

          <table>
            <tbody>
              <tr>
                <td>
                  <b>Email:</b>
                </td>
                <td>{email}</td>
              </tr>
              <tr>
                <td>
                  <b>Company:</b>
                </td>
                <td>{current_company}</td>
              </tr>
              <tr>
                <td>
                  <b>Hire Date:</b>
                </td>
                <td>{hire_date && hire_date.slice(0, 10)}</td>
              </tr>
              <tr>
                <td>
                  <b>Needs:</b>
                </td>
                <td>{needs}</td>
              </tr>
              <tr>
                <td>
                  <b>Goals:</b>
                </td>
                <td>{goals}</td>
              </tr>
              <tr>
                <td>
                  <b>Questions:</b>
                </td>
                {/* Add user questions here */}
              </tr>
            </tbody>
          </table>
        </div>

        <button
          onClick={e => {
            if (window.confirm("Are you sure you want to delete this user?")) {
              this.handleClickDeleteUser(e);
            }
          }}
          id="delete-click"
        >
          Delete
        </button>
      </div>
    );
  }
}

export default withRouter(AdminUserView);
