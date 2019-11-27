import React, { Component } from "react";
import UserDocsDataTable from "./userDocsDataTable";
import ElevateApi from "../../../../elevateApi";
import Spinner from "../../../Spinner/spinner";
import UserDocUploads from "./UserDocUploads";
import { UserContext } from "../../../../userContext";
import { Card } from "react-bootstrap";
import axios from "axios";

const BASE_URL = "http://localhost:3001";
const BUCKET = process.env.REACT_APP_S3_BUCKET;
const BASE_AWS_URL = `https://${BUCKET}.s3.amazonaws.com/`;

class DashboardManage extends Component {
  constructor(props) {
    super(props);
    this.state = { documents: [], files: [], loading: true, uploaded: false };
  }

  static contextType = UserContext;

  handleDrop = files => {
    this.setState({ files });
  };

  handleAWSUpload = async file => {
    const formData = new FormData();
    formData.append("file", file);

    const uploadRes = await axios.post(`${BASE_URL}/upload`, formData, {});

    if (uploadRes.statusText === "OK") {
      console.log(uploadRes.statusText);
    } else {
      // TODO We need error handling for this case
      console.log("There was an error uploading the file");
    }
  };

  handleLocalDBUpload = async file => {
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
      // TODO We need error handling for this case
      console.log("there was an error uploading the file");
    }
  };

  handleDocumentSubmission = async file => {
    await this.handleAWSUpload(file);
    await this.handleLocalDBUpload(file);
    await this.getDocuments();
  };

  async getDocuments() {
    try {
      let _token = localStorage.token;
      let { documents } = await ElevateApi.getUserDocuments(_token);
      this.setState({ documents, loading: false });
    } catch (err) {
      this.setState({ loading: false });
    }
  }

  async componentDidMount() {
    await this.getDocuments();
  }

  render() {
    const { documents } = this.state;
    return this.state.loading ? (
      <Spinner />
    ) : (
      <div className="UserDocsDataTable container-fluid">
        <UserDocUploads
          handleDrop={this.handleDrop}
          handleDocumentSubmission={this.handleDocumentSubmission}
          uploaded={this.state.uploaded}
        />
        <Card className="card p-4">
          <UserDocsDataTable documents={documents} />
        </Card>
      </div>
    );
  }
}

export default DashboardManage;
