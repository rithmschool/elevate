import React from "react";
import {UserContext} from "./UserContext"
import UserInfoEditForm from './UserInfoEditForm';
import ElevateApi from './ElevateApi';
import { Row, Col } from 'reactstrap';



class UserProfile extends React.Component {
  static contextType = UserContext;
  static defaultProps = {
    match: { params: {} },
  };
  constructor(props) {
    super(props);
    this.state = {
      isEditForm: false,
      updateStatus: ''
    }
    this.handleUpdate = this.handleUpdate.bind(this);

  }
  

  async handleUpdate(updatePost){
    const userId = this.context.userId;
    let res = await ElevateApi.updateUser(userId,updatePost);
    if(res){
      this.setState({updateStatus: 'Your info updated successfully!'})
    }
  }
  render(){
    const currentUser = this.context

    return (
      <div className="container">
      <br></br>
        <Row>
        <Col sm="8">
        <div >
          <UserInfoEditForm
            handleUpdate={this.handleUpdate}
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
