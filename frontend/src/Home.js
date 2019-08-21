import React, { Component } from "react";
import './Home.css';
import img1 from './img/1.jpg';

class Home extends Component {


  render(){
    
    return( 
      <div className="Home-background">
        <img src={img1} className="Home-stretch" alt="image1" />
        <h1 className="Home-h1"> Are You paid what you deserve?</h1>

      </div>
    );
  }
  
}

export default Home;