import React from "react";
import { withRouter } from "react-router-dom";
import ElevateApi from "../../../../elevateApi";


class AdminDocView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      doc: {},
    };
  }

  async componentDidMount() {
    try {
      const docId = this.props.match.params.docId;
      // get document 
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  render() {
    return (
      <h1>AdminDocView!!!</h1>
    )
  }
}

export default withRouter(AdminDocView);
