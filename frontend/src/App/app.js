import React from "react";
import { decode } from "jsonwebtoken";

import { UserContext } from "../userContext";
import Navigation from "./Navigation/navigation";
import Routes from "./Routes/routes";
import ElevateApi from "../elevateApi";
import Spinner from "./Spinner/spinner";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null,
      isLoading: true
    };

    this.handleLogOut = this.handleLogOut.bind(this);
    this.getCurrentUser = this.getCurrentUser.bind(this);
  }

  handleLogOut() {
    localStorage.removeItem("token");
    this.setState({ currentUser: null });
  }

  async componentDidMount() {
    await this.getCurrentUser();
  }

  async getCurrentUser() {
    const token = localStorage.getItem("token");

    try {
      let { user_id } = decode(token);
      let currentUser = await ElevateApi.getUser(user_id);
      currentUser = { ...currentUser, userId: user_id };

      this.setState({ currentUser, isLoading: false });
    } catch (err) {
      this.setState({ currentUser: null, isLoading: false });
    }
  }

  render() {
    if (this.state.isLoading) return <Spinner />;

    return (
      <UserContext.Provider value={this.state.currentUser}>
        <Navigation
          logout={this.handleLogOut}
          getCurrentUser={this.getCurrentUser}
        />
        <Routes getCurrentUser={this.getCurrentUser} />
      </UserContext.Provider>
    );
  }
}

export default App;
