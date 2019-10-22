import React, { Component } from "react";
import UserDocsDataTable from "./UserDocsDataTable";
// import { UserContext } from "../../../../userContext";
import ElevateApi from "../../../../elevateApi";

class DashboardManage extends Component {
  constructor(props) {
    super(props);
    this.state = { documents: [], loading: true };
  }

  async componentDidMount() {
    let documents;
    try {
      let _token = localStorage.token;
      let response = await ElevateApi.getDocuments(_token);
      documents = response.documents;
    } catch (err) {
      console.log(err);
      return err;
    }
    this.setState({ documents, loading: false });
  }

  render() {
    const { documents } = this.state;
    if (this.state.loading) {
      return <div>Loading.....</div>;
    }
    return (
      <div>
        <UserDocsDataTable documents={documents} />
      </div>
    );
  }
}

export default DashboardManage;
