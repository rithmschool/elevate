import React, { Component } from "react";
import { Form, Button, Alert, Card } from "react-bootstrap";
import "./UserDocUploads.scss";
import { UserContext } from "../../../../userContext";

class UserDocUploads extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
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

  static contextType = UserContext;

  //handle drag and drop feature & upload
  handleUpload(e) {
    e.persist();
    let file = e.target.files[0];
    if (file) {
      this.setState({ file });
    }
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
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      this.props.handleDrop(e.dataTransfer.files);
      e.dataTransfer.clearData();
      this.dragCounter = 0;
      let file = e.dataTransfer.files[0];

      if (file) {
        this.setState({
          file: file,
          drag: false
        });
      }
    }
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

  handleDelete() {
    this.setState({
      file: null
    });
  }

  //handle submit upload to AWS and send to db
  async handleSubmit(e) {
    e.preventDefault();
    await this.props.handleDocumentSubmission(this.state.file);
    this.setState({
      file: null
    });
  }

  render() {
    let disabledBtn = this.state.file ? false : true;

    return (
      <div className="UploadContainer" ref={this.dropRef}>
        <Card className="card text-center p-5">
          <Card.Body>
            <Card.Subtitle className="mb-2 text-muted">
              <h4>Drop documents here for review</h4>
            </Card.Subtitle>
            <div>
              <div>
                {this.state.file && (
                  <div key={this.state.file.lastModified} className="mt-3">
                    {this.state.file.name}
                    <button
                      onClick={() => {
                        this.handleDelete(this.state.file.name);
                      }}
                      className="delete"
                    >
                      remove
                    </button>
                  </div>
                )}
              </div>
              <Form onSubmit={this.handleSubmit}>
                <label className="btn custom-file-upload mt-3">
                  <input type="file" onChange={this.handleUpload} />
                  Upload documents
                </label>
                <Button type="submit" className="btn btn-primary mt-2" disabled={disabledBtn}>
                  Submit
                </Button>
              </Form>
              <div>
                {this.props.uploaded ? (
                  <div className="row justify-content-md-center">
                    <Alert variant="success" className="col-md-6 col-md-offset-3 mt-4">
                      File uploaded successfully
                    </Alert>
                  </div>
                ) : (
                  <i className="fas fa-upload fa-2x mt-4"></i>
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
