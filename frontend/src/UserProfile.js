import React from "react";
import {UserContext} from "./UserContext"
import UserBasicInfoForm from './UserBasicInfoForm';
import UserSalaryInfoForm from './UserSalaryInfoForm'
import ElevateApi from './ElevateApi';
import { Row, Col } from 'reactstrap';
import Spinner from './Spinner';
import Alert from "./Alert";


const MESSAGE_SHOW_PERIOD_IN_MSEC = 3000;

class UserProfile extends React.Component {
  static contextType = UserContext;
  static defaultProps = {
    match: { params: {} },
  };
  constructor(props) {
    super(props);
    this.state = {
      lastestSalary: null,
      isLoading: true,
      errors: [],
      saveConfirmed: false,
      hasSalaryRecord: true,
    }
    this.handleUserUpdate = this.handleUserUpdate.bind(this);
    this.handleSalaryUpdate = this.handleSalaryUpdate.bind(this);
    

  }


  /**
   * check if the user has any salary records in salaries table
   * if No set hasSalaryRecord to false and create latestSalary object with default values of 0
   *  */
  async componentDidMount(){
    const userId = this.context.userId;
    try{
      let lastestSalary = await ElevateApi.getLatestSalary(userId);
      this.setState({lastestSalary, isLoading: false});
    } catch(err){
      // if current user has not any salaries record create an empty salary entry to populate the display form
        const lastestSalary = {
          user_id: this.context.userId,
          salary: 0,
          bonus: 0,
          equity: 0
        }
        this.setState({lastestSalary, isLoading: false, hasSalaryRecord: false});
      }
  }

  async handleSalaryUpdate(salary){
    if(!this.state.hasSalaryRecord){
      try{
        let res = await ElevateApi.postSalary(salary);
        this.setState(
          {
            errors: [],
            saveConfirmed: true,
            isEdit: false,
          }, () => {
            // after a short period, remove status message
            setTimeout(
              () => this.setState({ saveConfirmed: false }),
              MESSAGE_SHOW_PERIOD_IN_MSEC);
          });
      } catch (errors) {
          this.setState({ errors });
        }
    }
    else {
        try{
          await ElevateApi.updateSalary(this.context.userId, salary);
          this.setState(
            {
              errors: [],
              saveConfirmed: true,
              isEdit: false,
            }, () => {
              // after a short period, remove status message
              setTimeout(
                () => this.setState({ saveConfirmed: false }),
                MESSAGE_SHOW_PERIOD_IN_MSEC);
            });
        } catch (errors) {
            this.setState({ errors });
          }
        }
}
// update user infos
  async handleUserUpdate(updateUser,userId){
    try{
      await ElevateApi.updateUser(userId, updateUser);

      this.setState(
        {
          saveConfirmed: true,
        }, () => {
          // after a short period, remove status message
          setTimeout(
            () => this.setState({ saveConfirmed: false }),
            MESSAGE_SHOW_PERIOD_IN_MSEC);
        });
    } catch (errors) {
        this.setState({ errors });
      }
  }
     
   
  render(){
    const currentUser = this.context;
    const lastestSalary = this.state.lastestSalary;
    if(this.state.isLoading)return <Spinner/>;

    return (
      <div className="container">
        {this.state.errors.length > 0 &&
              <Alert type="danger" messages={this.state.errors} />}

            {this.state.saveConfirmed &&
              <Alert type="success"
                    messages={["Updated successfully."]} />}
        <Row>
         <Col md={6}>
            <h3 className="text-info">User information</h3>
          </Col>
        </Row>
        <br></br>
        <Row>
          <Col md={6}>
          <div >
            <UserBasicInfoForm
              handleUserUpdate={this.handleUserUpdate}
              handleSalaryUpdate={this.handleSalaryUpdate}
              {...currentUser}
              />
          </div>
          </Col>
        </Row>
        <br></br>
        <Row>
          <Col md={6}>
          <div >

            <UserSalaryInfoForm
              handleSalaryUpdate={this.handleSalaryUpdate}
              {...lastestSalary}
              />
          </div>
          </Col>
          </Row>
      </div>  
    )
  } 
}
export default UserProfile;
