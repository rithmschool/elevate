import React from "react";
import UserCharges from './UserCharges';

class UserProfile extends React.Component {
render(){
   let userId =this.props.match.params.userId;
  return(
    <UserCharges userId={userId} /> 
  )
}
}
export default  UserProfile;