import React from "react";
import { Row, Col } from "reactstrap";

import { UserContext } from "../../../userContext";
import ElevateApi from "../../../elevateApi";
import UserSalaryInfoForm from "./UserSalaryInfoForm/userSalaryInfoForm";
import Spinner from "../../../Spinner/spinner";
import Alert from "../Alert/alert";
import UserBasicInfoForm from "./UserBasicInfoForm/userBasicInfoForm";

const MESSAGE_SHOW_PERIOD_IN_MSEC = 3000;

class UserProfile extends React.Component {
  static contextType = UserContext;

  static defaultProps = {
    match: { params: {} }
  };

  constructor(props) {
    super(props);

    this.state = {
      lastestSalary: null,
      isLoading: true,
      errors: [],
      saveConfirmed: false,
      hasSalaryRecord: true
    };

    this.handleUserUpdate = this.handleUserUpdate.bind(this);
    this.handleSalaryUpdate = this.handleSalaryUpdate.bind(this);
  }

  /**
   check for user salary records in salaries table
   set default to 0 if there are no salary records
  **/
  async componentDidMount() {
    const userId = this.context.userId || 0;
    try {
      let lastestSalary = await ElevateApi.getLatestSalary(userId);

      this.setState({ lastestSalary, isLoading: false });
    } catch (err) {
      const lastestSalary = {
        user_id: this.context.userId,
        salary: 0,
        bonus: 0,
        equity: 0
      };

      this.setState({
        lastestSalary,
        isLoading: false,
        hasSalaryRecord: false
      });
    }
  }

  async handleSalaryUpdate(salary) {
    if (!this.state.hasSalaryRecord) {
      try {
        await ElevateApi.postSalary(salary);
        this.setState(
          {
            errors: [],
            saveConfirmed: true,
            isEdit: false
          },
          () => {
            setTimeout(
              () => this.setState({ saveConfirmed: false }),
              MESSAGE_SHOW_PERIOD_IN_MSEC
            );
          }
        ); // remove status message after setTimeout
      } catch (errors) {
        this.setState({ errors });
      }
    } else {
      try {
        await ElevateApi.updateSalary(this.context.userId, salary);
        this.setState(
          {
            errors: [],
            saveConfirmed: true,
            isEdit: false
          },
          () => {
            setTimeout(
              () => this.setState({ saveConfirmed: false }),
              MESSAGE_SHOW_PERIOD_IN_MSEC
            );
          }
        ); // remove status message after setTimeout
      } catch (errors) {
        this.setState({ errors });
      }
    }
  }

  async handleUserUpdate(updateUser, userId) {
    try {
      await ElevateApi.updateUser(userId, updateUser);
      this.setState(
        {
          saveConfirmed: true
        },
        () => {
          setTimeout(
            () => this.setState({ saveConfirmed: false }),
            MESSAGE_SHOW_PERIOD_IN_MSEC
          );
        }
      ); // remove status message after setTimeout
    } catch (errors) {
      this.setState({ errors });
    }
  }

  render() {
    const currentUser = this.context;
    const lastestSalary = this.state.lastestSalary;
    if (this.state.isLoading) return <Spinner />;

    return (
      <div className="container">
        {this.state.errors.length > 0 && (
          <Alert type="danger" messages={this.state.errors} />
        )}

        {this.state.saveConfirmed && (
          <Alert type="success" messages={["Updated successfully."]} />
        )}
        <Row>
          <Col md={6}>
            <div>
              <UserBasicInfoForm
                handleUserUpdate={this.handleUserUpdate}
                handleSalaryUpdate={this.handleSalaryUpdate}
                {...currentUser}
              />
            </div>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <div style={{ marginBottom: "8em" }}>
              <UserSalaryInfoForm
                handleSalaryUpdate={this.handleSalaryUpdate}
                {...lastestSalary}
              />
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default UserProfile;
