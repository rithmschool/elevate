import React from "react";
import UserDocUploads from "./UserDocUploads";

class DashboardManage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: []
    };
    this.handleDrop = this.handleDrop.bind(this);
  }

  handleDrop = files => {
    this.setState({ files });
  };

  render() {
    return (
      <div>
        <UserDocUploads handleDrop={this.handleDrop} />
      </div>
    );
  }
}

export default DashboardManage;
