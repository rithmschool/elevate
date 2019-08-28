import React from "react";
import {UserContext} from "./UserContext"
import UserInfoEditForm from './UserInfoEditForm';
import ElevateApi from './ElevateApi'
class UserProfile extends React.Component {
  static contextType = UserContext;
  static defaultProps = {
    match: { params: {} },
  };
  
  constructor(props) {
    super(props);
    this.state = {
      isEditForm: false,
    }
    this.toggleEditForm = this.toggleEditForm.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this)

  }

    // const { userId } = this.props.match.params;

  
  toggleEditForm() {
    this.setState(st => ({
      isEditForm: !st.isEditForm
    }))
  }
  handleUpdate(updatePost){
    console.log('updated object',updatePost)
    const userId = this.context.userId;
    ElevateApi.updateUser(userId,updatePost)
  }
  render(){
    const currentUser = this.context
    return (
      <div >
        {this.state.isEditForm ? <UserInfoEditForm
          handleUpdate={this.handleUpdate}
          toggleEditForm={this.toggleEditForm}
          {...currentUser}
          userId={currentUser.userId}/>:

          <div className="container">
            <div>
              <div>
                <h1 className="d-inline  left" >Hello {currentUser.first_name}!</h1>
                <i className="far fa-edit d-inline p-2 m-1 float-right PostIcon PostEdit" 
                  onClick={this.toggleEditForm} />
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <strong>First Name:</strong> {currentUser.first_name}
                </li>
                <li className="list-group-item">
                  <strong>Last name:</strong> {currentUser.last_name}
                </li>
                <li className="list-group-item">
                  <strong>Email:</strong> {currentUser.email}
                </li>
                <li className="list-group-item">
                  <strong>Current company:</strong> {currentUser.current_company}
                </li>
                <li className="list-group-item">
                  <strong>Salary:</strong> {currentUser.salary}
                </li>
                <li className="list-group-item">
                  <strong>Hiring date:</strong> {currentUser.hire_date}
                </li>
              </ul>
            </div>

            
          </div> 
        
        }
    </div>
  )
  } 
}

export default UserProfile;
