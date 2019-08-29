import React from "react";


const overview = () => <div><h2>overview</h2></div>
const UserPanelRoutes = [
  {
    path: "/overview",
    exact: true,
    content: overview,
    name: 'My Comp Overview'
  },
  {
    path: "/offers",
    exact: true,
    content: () => <h2>My offers</h2>,
    name: 'My offers'
  },
  {
    path: "/upload-offer",
    content: () => <h2>Upload an offer</h2>,
    name: 'Upload an offer'
  },
  {
    path: "/templates",
    content: () => <h2>Templates</h2>,
    name: 'Templates'
  },
  {
    path: "/schedule",
    content: () => <h2>Schedule a pro</h2>,
    name: 'Schedule a pro'
  },
  {
    path: "/market-data",
    content: () => <h2>Market data</h2>,
    name: 'Market data'
  },
  {
    path: "/refer-friend",
    content: () => <h2>Refer a friend</h2>,
    name: 'Refer a friend'
  }
];

export default UserPanelRoutes;


<Row>
  <Col md={6}>
    <h3 className="text-info">User information</h3>
  </Col>
  <Col align="right" md={6} sm={{ size: 10, offset: 0}}>
    <Button color="info" size="sm" 
    onClick={this.toggleEdit}>
    Edit details</Button>
  </Col>
</Row>