import React, { Component } from "react";
import UserDocsDataTable from "./userDocsDataTable";
import ElevateApi from "../../../../elevateApi";
import Spinner from "../../../Spinner/spinner";

class DashboardManage extends Component {
  constructor(props) {
    super(props);
    this.state = { documents: [], loading: true };
  }

  async componentDidMount() {

    try {
      let _token = localStorage.token;
      let { documents } = await ElevateApi.getDocuments(_token);
      this.setState({ documents, loading: false });
    } catch (err) {
      console.log(err);
      this.setState({loading: false });
      return err;
    }
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
