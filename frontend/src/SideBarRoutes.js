import React from "react";


const overview = () => <div><h2>overview</h2></div>
const offers = () => <div><h2>Offers</h2></div>

const routes = [
  {
    path: "/profile",
    exact: true,
    content: overview,
    name: 'My Comp Overview'
  },
  {
    path: "/offers",
    exact: true,
    content: offers,
    name: 'My offers'
  },
  {
    path: "/upload-offer",
    content: () => <h2>x</h2>,
    name: 'Upload an offer'
  },
  {
    path: "/templates",
    content: () => <h2>x</h2>,
    name: 'Templates'
  },
  {
    path: "/schedule",
    content: () => <h2>x</h2>,
    name: 'Schedule a pro'
  },
  {
    path: "/market-data",
    content: () => <h2>x</h2>,
    name: 'Market data'
  },
  {
    path: "/refer-friend",
    content: () => <h2>x</h2>,
    name: 'Refer a friend'
  }
];

export default routes;