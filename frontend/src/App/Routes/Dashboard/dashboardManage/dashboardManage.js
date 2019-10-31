import React, { Component } from "react";
import UserDocsDataTable from "./userDocsDataTable";
import ElevateApi from "../../../../elevateApi";
import Spinner from "../../../Spinner/spinner";
import UserDocUploads from "./UserDocUploads";
import { UserContext } from "../../../../userContext";
import axios from "axios";
const BASE_URL = "http://localhost:3001";
const BUCKET = process.env.S3_BUCKET;
const BASE_AWS_URL = `https://${BUCKET}.s3-us-west-1.amazonaws.com/`;

class DashboardManage extends Component {
  constructor(props) {
    super(props);
    this.state = { documents: [], files: [], loading: true, uploaded: false };
    this.handleDrop = this.handleDrop.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  static contextType = UserContext;

  handleDrop = files => {
    this.setState({ files });
  };

  async handleSubmit(file) {
    const formData = new FormData();
    formData.append("file", file);

    const uploadRes = await axios.post(`${BASE_URL}/upload`, formData, {});

    if (uploadRes.statusText === "OK") {
      console.log(uploadRes.statusText);
    } else {
      // TODO We need error hanling for this case
      console.log("there was an error uploading the file");
    }

    // This section is for sending to DB
    const token = localStorage.getItem("token");

    const sendToDb = {
      _token: token,
      title: file.name,
      counterparty: "",
      status: "unreviewed",
      date_reviewed: null,
      url: BASE_AWS_URL + file.name,
      user_id: this.context.userId
    };

    let res = await ElevateApi.addToDB(sendToDb);

    if (res.docs) {
      this.setState({ uploaded: true });
    } else {
      // TODO We need error hanling for this case
      console.log("there was an error uploading the file");
    }
    await this.getData();
  }

  async getData() {
    try {
      let _token = localStorage.token;
      let { documents } = await ElevateApi.getDocuments(_token);
      this.setState({ documents, loading: false });
    } catch (err) {
      this.setState({ loading: false });
      console.log(err);
    }
  }

  async componentDidMount() {
    await this.getData();
  }

  render() {
    const { documents } = this.state;
    if (this.state.loading) {
      return <Spinner />;
    }
    return (
      <div>
        <div>
          <UserDocUploads
            handleDrop={this.handleDrop}
            handleSubmit={this.handleSubmit}
            uploaded={this.state.uploaded}
          />
        </div>
        <div>
          <UserDocsDataTable documents={documents} />
        </div>
      </div>
    );
  }
}

export default DashboardManage;
