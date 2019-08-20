import React, { Component } from "react";
import './Home.css'
class Home extends Component {

  render(){
    let img1 = 'https://www.affordablebackgroundchecks.com/blog/wp-content/uploads/2018/03/Job-Interview.jpg'
    
    return( 
      <div className="Home-background">
        <img src={img1} className="Home-stretch" alt="" />
      </div>
    );
  }
  
}

export default Home;