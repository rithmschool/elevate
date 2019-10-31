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
    let fileList = this.state.files;
    for (var i = 0; i < files.length; i++) {
      if (!files[i].name) return;
      fileList.push(files[i].name);
    }
    this.setState({ files: fileList });
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
