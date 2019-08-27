import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import SideBar from './SideBar'
import routes from './UserPanelRoutes'

class UserProfile extends React.Component {
  
  render(){

    return (
      <Router>
        <div style={{ position: 'relative', margin: '10px'}}>
       <SideBar routes={routes}/>

          {/* render user profile components */}
          <div style={{ flex: 1, padding: "10px" }}>
            {routes.map(route => (
              <Route
                key={route.path}
                path={route.path}
                exact={route.exact}
                component={route.content}
              />
            ))}
          </div>
          </div>
        
      </Router>
  );
}
}

export default UserProfile;
