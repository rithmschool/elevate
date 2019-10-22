import React, { Component } from "react";
import {
  Form,
  FormGroup,
  FormControl,
  Button,
  Alert,
  Card
} from "react-bootstrap";
import ElevateApi from "../../../elevateApi";
import "./UserDocUploads.css"

class UserDocUploads extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      uploaded: false
    };

    this.handleUpload = this.handleUpload.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUpload(e) {
    let files = e.target.files[0];

    if (files) {
      this.setState({ ...this.state, files: [...this.state.files, files] });
    }
  }

  async handleSubmit(e) {
    e.preventDefault();
    this.setState({ ...this.state, uploaded: true });

    const token = localStorage.getItem("token");

    const formData = {
      _token: token,
      title: this.state.files[0].name,
      counterparty: "Alex",
      status: "unreviewed",
      date_reviewed: null
    };

    const result = await ElevateApi.uploadDoc(formData);
  }

  render() {
    return (
      <div className="file-upload-wrapper">
        <Card className="card text-center p-5">
          <Card.Body>
            <Card.Subtitle className="mb-2 text-muted">
              Drop documents here for review
            </Card.Subtitle>
            <div>
              <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                  <FormControl
                    name="docs"
                    type="file"
                    multiple
                    onChange={this.handleUpload}
                  ></FormControl>
                </FormGroup>
                <Button type="submit">Upload a document</Button>
              </Form>
              <div>
                {this.state.uploaded ? (
                  <Alert variant="success">File uploaded</Alert>
                ) : <i className="fas fa-upload fa-2x mt-3"></i>}
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default UserDocUploads;
