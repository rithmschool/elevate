import React from "react";
import UserDocUploads from "./UserDocUploads";
import DragAndDrop from "./DragAndDrop";

class DashboardManage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [
        'nice.pdf',
        'verycool.jpg',
        'amazing.png',
        'goodstuff.mp3',
        'thankyou.doc'
      ]
    }
    this.handleDrop = this.handleDrop.bind(this);
  }
  

   handleDrop = (files) => {
      let fileList = this.state.files
      for (var i = 0; i < files.length; i++) {
        if (!files[i].name) return
        fileList.push(files[i].name)
      }
      this.setState({files: fileList})
    }

  render() {
    return (
      <div>
        <UserDocUploads />

        <div>below is a test</div>
        <DragAndDrop handleDrop={this.handleDrop}>
        <div style={{height: 300, width: 500}}>
          {this.state.files.map((file) =>
            <div>{file}</div>
          )}
        </div>
        </DragAndDrop>
      </div>
    );
  }
}

export default DashboardManage;
