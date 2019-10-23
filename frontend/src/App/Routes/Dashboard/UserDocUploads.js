import React, { Component } from "react";
import { Form, Button, Alert, Card } from "react-bootstrap";
import ElevateApi from "../../../elevateApi";
import "./UserDocUploads.css";

class UserDocUploads extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      uploaded: false,
      drag: false
    };

    this.handleUpload = this.handleUpload.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
    this.handleDragIn = this.handleDragIn.bind(this);
    this.handleDragOut = this.handleDragOut.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
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

    await ElevateApi.uploadDoc(formData);
  }

  dropRef = React.createRef();

  handleDrag = e => {
    e.preventDefault();
    e.stopPropagation();
  };

  handleDragIn = e => {
    e.preventDefault();
    e.stopPropagation();
    this.dragCounter++;
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      this.setState({ drag: true });
    }
  };

  handleDragOut = e => {
    e.preventDefault();
    e.stopPropagation();
    this.dragCounter--;
    if (this.dragCounter === 0) {
      this.setState({ drag: false });
    }
  };

  handleDrop(e) {
    console.log(e);
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      this.props.handleDrop(e.dataTransfer.files);
      e.dataTransfer.clearData();
      this.dragCounter = 0;
    }

    let files = e.dataTransfer.files[0];
    
    if (files) {
      this.setState({
        ...this.state,
        files: [...this.state.files, files],
        drag: false
      });
    }

    console.log("files", files);
  }

  handleDelete(e) {
    console.log(e.target);
  }

  componentDidMount() {
    let div = this.dropRef.current;
    div.addEventListener("dragenter", this.handleDragIn);
    div.addEventListener("dragleave", this.handleDragOut);
    div.addEventListener("dragover", this.handleDrag);
    div.addEventListener("drop", this.handleDrop);
  }

  componentWillUnmount() {
    let div = this.dropRef.current;
    div.removeEventListener("dragenter", this.handleDragIn);
    div.removeEventListener("dragleave", this.handleDragOut);
    div.removeEventListener("dragover", this.handleDrag);
    div.removeEventListener("drop", this.handleDrop);
  }

  render() {
    return (
      <div ref={this.dropRef}>
        <Card className="card text-center p-5">
          <Card.Body>
            <Card.Subtitle className="mb-2 text-muted">
              Drop documents here for review
            </Card.Subtitle>
            <div>
              <div>
                {this.state.files
                  ? this.state.files.map(file => (
                      <div key={file.lastModified} className="mt-3">
                        {file.name}
                        <button onClick={this.handleDelete} className="delete">
                          X
                        </button>
                      </div>
                    ))
                  : null}
              </div>
              <Form onSubmit={this.handleSubmit}>
                <label className="custom-file-upload mt-4">
                  <input type="file" onChange={this.handleUpload} />
                  Upload documents
                </label>
                <Button type="submit" className="btn btn-successmt-4">
                  Submit
                </Button>
              </Form>
              <div>
                {this.state.uploaded ? (
                  <Alert variant="success" className="mt-4">
                    Files uploaded
                  </Alert>
                ) : (
                  <i className="fas fa-upload fa-2x mt-2"></i>
                )}
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default UserDocUploads;
