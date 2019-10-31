import React from "react";
import { withRouter, Redirect } from "react-router-dom";
import "./adminUserView.css";
import ElevateApi from "../../../../elevateApi";
import Spinner from "../../../Spinner/spinner";

class AdminUserView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      redirect: false
    };
  }

  async componentDidMount() {
    try {
      const userId = this.props.match.params.userId;
      const user = await ElevateApi.getUser(userId);
      this.setState({ user });
    } catch (err) {
      console.log(err);
      this.setState({ redirect: true });
      return err;
    }
  }

  handleClickDeleteUser = async () => {
    await ElevateApi.deleteUser(this.props.match.params.userId);
    let users;

    try {
      users = await ElevateApi.getUsers();
    } catch (err) {
      console.log(err);
      return err;
    }
    this.props.updateUserState(users);
    this.props.history.push("/dashboard/admin/users");
  };

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

    const { user, redirect } = this.state;

    if (!user) {
      return <Spinner />;
    }

    if (redirect) {
      return <Redirect to="/dashboard/admin/users" />;
    }

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
