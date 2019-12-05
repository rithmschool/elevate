import React from "react";
import { withRouter } from "react-router-dom";
import ElevateApi from "../../../../elevateApi";


class AdminDocView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      doc: {},
    };
  }

  componentDidMount() {
    try {
      const docId = this.props.match.params.docId;
      const doc = this.props.allDocs.find(cur => cur.id === Number(docId));
      this.setState({ doc: doc || {} });
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  generateDocumentTable() {
    const { id, title, date_submitted, date_reviewed, status, url, counterparty } = this.state.doc;
    return (
        <tbody key={id}>
          <tr>
            <td>id</td>
            <td>{id}</td>
          </tr>

          <tr>
            <td>title</td>
            <td>{title}</td>
          </tr>

          <tr>
            <td>date_submitted</td>
            <td>{date_submitted}</td>
          </tr>

          <tr>
            <td>date_reviewed</td>
            <td>{date_reviewed}</td>
          </tr>

          <tr>
            <td>status</td>
            <td>{status}</td>
          </tr>

          <tr>
            <td>url</td>
            <td>{url}</td>
          </tr>

          <tr>
            <td>counterparty</td>
            <td>{counterparty}</td>
          </tr>
        </tbody>
    );
  }

  render() {
    return (
      <table>
        {this.generateDocumentTable()}
      </table>
    )
  }
}

export default withRouter(AdminDocView);

