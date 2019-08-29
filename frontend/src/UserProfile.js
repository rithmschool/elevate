import React from "react";
import {UserContext} from "./UserContext"
import UserInfoEditForm from './UserInfoEditForm';
import ElevateApi from './ElevateApi';
import { Row, Col } from 'reactstrap';
import Spinner from './Spinner';


class UserProfile extends React.Component {
  static contextType = UserContext;
  static defaultProps = {
    match: { params: {} },
  };
  constructor(props) {
    super(props);
    this.state = {
      isEditForm: false,
      updateStatus: '',
      lastestSalary: {},
      isLoading: true
    }
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleSalaryUpdate = this.handleSalaryUpdate.bind(this);

  }
  async componentDidMount(){

    const userId = this.context.userId;
    try{
      let res = await ElevateApi.getLatestSalary(userId);
      this.setState({lastestSalary: res, isLoading: false})
    } catch(err){
      console.log(err)
    }
  }

  async handleSalaryUpdate( userId, updatedSalary){
    let salary = {...this.state.lastestSalary, salary: updatedSalary}
    let res = await ElevateApi.updateSalary(userId, salary)
    this.setState({lastestSalary: res})
  }

  async handleUpdate(updateUser,userId){
    let res = await ElevateApi.updateUser(userId, updateUser);
   
    if(res){
      this.setState({updateStatus: 'Your info updated successfully!'})
    }
  }
  render(){
    const currentUser = this.context
    if(this.state.isLoading)
      return <Spinner/>;

    return (
      <div className="container">
      <br></br>
        <Row>
        <Col sm="8">
        <div >
          <UserInfoEditForm
            handleUpdate={this.handleUpdate}
            handleSalaryUpdate={this.handleSalaryUpdate}
            salary={this.state.lastestSalary.salary}
            {...currentUser}
            updateStatus={this.state.updateStatus}
            userId={currentUser.userId}/>
        </div>
        </Col>
        <Col sm="4">
       <div>

       </div>
        </Col>
      </Row>
    </div>  
    )
  } 
}

export default UserProfile;
