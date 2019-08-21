import React from "react";
import './Home.css';
import img1 from './img/001.jpg';

class Home extends React.Component {

  render(){
    
    return( 
      <div >
        <h1 className="Home-h1"> Are You paid what you deserve?</h1>
        <img src={img1} className="Home-stretch" alt="image1" />
      </div>
    );
  }
}

export default Home;