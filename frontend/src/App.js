import React from "react";
import { decode } from "jsonwebtoken"
import Navigation from "./Navigation";
import Routes from "./Routes";
import ElevateApi from './ElevateApi';
import { UserContext, AdminContext} from "./UserContext";


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null,
      isLoading: true,
      isAdmin: false
    }
    this.handleLogOut = this.handleLogOut.bind(this);
    this.getCurrentUser = this.getCurrentUser.bind(this);
  }
  handleLogOut() {
    localStorage.removeItem("token");
    this.setState({ currentUser: null, isAdmin: false });
  }


  async componentDidMount() {
    await this.getCurrentUser();
  }
  async getCurrentUser() {
    const token = localStorage.getItem("token");

    try {
      let { user_id, is_admin } = decode(token);
      let currentUser = await ElevateApi.getUser(user_id);
      currentUser = {...currentUser, userId: user_id}

      this.setState({ currentUser, isLoading: false, isAdmin: is_admin });
    } catch (err) {
      this.setState({ currentUser: null, isLoading: false });
    }
  }



  render(){
    return(
      this.state.isLoading?  <div className="loader"></div>:
      <UserContext.Provider value={this.state.currentUser}>
        <AdminContext.Provider value={this.state.isAdmin}>
          <Navigation logout={this.handleLogOut}/>
          <Routes getCurrentUser={this.getCurrentUser}/>
        </AdminContext.Provider>
      </UserContext.Provider>
    )
  }
}

export default App;