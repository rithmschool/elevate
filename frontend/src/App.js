import React from "react";
import Navigation from "./Navigation";
import Routes from "./Routes";

class App extends React.Component {

  render(){
    return(
      <div className="App">
        <Navigation />
        <Routes/>
       </div>
    )
  }
}

export default App;