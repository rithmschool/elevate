import React, { Component } from "react";
import UserDocsDataTable from "./UserDocsDataTable";
import ElevateApi from "../../../../elevateApi";
import Spinner from "../../../Spinner/spinner";

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
      this.setState({loading: false });
      return err;
    }
    this.setState({ documents, loading: false });
  }

  render() {
    const { documents } = this.state;
    if (this.state.loading) {
      return <Spinner />;
    }
    return (
      <div>
        <UserDocsDataTable documents={documents} />
      </div>
    );
  }
}

export default DashboardManage;
