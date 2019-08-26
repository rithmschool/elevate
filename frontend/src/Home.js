import React from "react";
import './Home.css';
import img1 from './img/001.jpg';

class Home extends React.Component {

  render(){  
    return( 
      <div className="Home-container">
        <img src={img1} className="Home-image1" alt="image1" />
        <h1 className="Home-h1"> Are You paid what you deserve?</h1>
      </div>
    );
  }
}

export default Home;