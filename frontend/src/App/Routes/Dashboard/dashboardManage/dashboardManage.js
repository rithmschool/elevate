import React, { Component } from "react";
import UserDocsDataTable from "./userDocsDataTable";
import ElevateApi from "../../../../elevateApi";
import Spinner from "../../../Spinner/spinner";
import UserDocUploads from "./UserDocUploads";

class DashboardManage extends Component {
  constructor(props) {
    super(props);
    this.state = { documents: [], files: [], loading: true };
    this.handleDrop = this.handleDrop.bind(this);
  }

  handleDrop = files => {
    this.setState({ files });
  };

  async componentDidMount() {
    try {
      let _token = localStorage.token;
      let { documents } = await ElevateApi.getDocuments(_token);
      debugger;
      this.setState({ documents, loading: false });
    } catch (err) {
      this.setState({ loading: false });
      console.log(err);
    }
  }

  render() {
    const { documents } = this.state;
    if (this.state.loading) {
      return <Spinner />;
    }
    return (
      <div>
        <div>
          <UserDocUploads handleDrop={this.handleDrop} />
        </div>
        <div>
          <UserDocsDataTable documents={documents} />
        </div>
      </div>
    );
  }
}

export default DashboardManage;
