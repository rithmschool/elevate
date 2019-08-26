import React from "react";
import Navigation from "./Navigation";
import Routes from "./Routes";
import ElevateApi from './ElevateApi';

const jwt = require('jsonwebtoken');
const token = localStorage.getItem('token');

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      isLoggedin: false
    }

    this.checkToken = this.checkToken.bind(this)
  }

  async componentDidMount() {
    await this.checkToken(token);
  }

  async checkToken(token) {
    try {
      if (token) {
        let userId = jwt.decode(token).user_id;
        let user = await ElevateApi.getUser(userId);
        this.setState({ user, isLoggedin: true });
      } else {
        this.setState({user: {}, isLoggedin: false});
      }
    } catch (err) {
      this.setState({ user: {}, isLoggedin: false });
      return `error: ${err}`;
    }
  }

  render(){
    return(
      <div className="App">
        <Navigation user={this.state.user} isLoggedin={this.state.isLoggedin}/>
        <Routes checkToken={this.checkToken}/>
       </div>
    )
  }
}

export default App;