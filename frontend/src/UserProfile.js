import React from "react";
import {UserContext} from "./UserContext"
import UserInfoEditForm from './UserInfoEditForm';
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
      isEdit: false,
      lastestSalary: null,
      isLoading: true,
      hasSalaryRecord: true,
      errors: [],
      saveConfirmed: false,
    }
    this.handleUserUpdate = this.handleUserUpdate.bind(this);
    this.handleSalaryUpdate = this.handleSalaryUpdate.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this)

  }

  toggleEdit(){
    this.setState({
      isEdit: !this.state.isEdit
    });
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
        this.setState({lastestSalary, isLoading: false});
      }
  }

  async handleSalaryUpdate(salary, currentCompany){
    // can't update salary without providing the company name
    if(currentCompany.length === 0 && Object.values({...salary, user_id: 0}).some( i=> i>0)) {
      let errors = ['You should provide a company name'];
      this.setState({ errors });
    }
    else{      
        try{
          await ElevateApi.updateSalary(this.context.userId, salary)
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
    if(this.state.isLoading)
      return <Spinner/>;

    return (
      <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
        <br></br>
        <Row>
          <Col sm="8">
          <div >
          {this.state.errors.length ? (
                  <Alert type="danger" messages={this.state.errors} />
                ) : null}

                {this.state.saveConfirmed ? (
                  <Alert type="success"
                        messages={["Basic info updated successfully."]} />
                ) : null}

            <UserInfoEditForm
              handleUserUpdate={this.handleUserUpdate}
              handleSalaryUpdate={this.handleSalaryUpdate}
              toggleEdit={this.toggleEdit}
              isEdit={this.state.isEdit}
              {...lastestSalary}
              {...currentUser}
              userId={currentUser.userId}/>
              
          </div>
          </Col>
        </Row>
      </div>  
    )
  } 
}

export default UserProfile;
