import React from "react";
import './Home.css';
import { Button } from 'reactstrap';
import img1 from './img/001.jpg';


class Home extends React.Component {

  render(){  
    return( 
      <div>
        <div className="Home-container">
          <img src={img1} className="Home-image1" alt="image1" />
          <h1 className="Home-h1"> Are You paid what you deserve?</h1>
        </div>

        <div className="Home-template">
          <h1 className="Home-h1-template">Templates and professionals available 24/7</h1>
          <i className="fas fa-user-tie"></i>
        </div>

      <div className="Home-database ">
        <i className="fas fa-chart-bar"></i>
        <h1 className="Home-h1-template">Get yout comp verified by our proprietary database</h1>
      </div>

      <div className="Home-circle">
          <div className="row">
              <div className="col-sm-4">
                <div className="circle ">
                <h2>75<small>%</small><p>increase offer</p></h2>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="circle ">
                <h2>20<small>%</small><p>average increase in salary</p></h2>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="circle ">
                <h2>90<small>%</small><p>better understand comp</p></h2>
                </div>
              </div>
          </div>
      </div>
      <div className="Home-get-started">
          <h2 className="">Get Started Today</h2>
          <Button color="primary">Review My Offer</Button>
        </div>
     </div>
    );
  }
}

export default Home;