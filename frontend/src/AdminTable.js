import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import './AdminTable.css'

const MQL = window.matchMedia(`(max-width: 640px)`);
// set the maximum number of table columns for smaller and larger screens
const MAXCOLUMNCOUNT = MQL.matches ? 5 : 12;

class AdminTable extends Component {
  handleClick = (evt) => {
    const id = evt.target.parentElement.id;
    this.props.getUserDetail(id);
  }
  createTableHeader() {
    const keys = Object.keys(this.props.tableObjs[0]);

    return (
      <tr>
        {keys.map(key => {
          // Remove underscore from key name
          key = key.replace(/_/g, ' ');

          return <th key={key}>{key}</th>
        }).filter((key, idx) => idx < MAXCOLUMNCOUNT)}
      </tr>
    );
  }

  /** For each array of objects it returns an array of itemKeys, itemValues 
   * and accesses the user_id from each object record. The user_id is required
   * for createTableRows() to identify and display user details when clicking on any given table row */
  createTableBody() {
    const table = this.props.tableObjs.map(item => {
      const itemKeys = Object.keys(item);
      const itemValues = Object.values(item);
      const userId= item.user_id

      return this.createTableRows(itemKeys, itemValues, userId);
    });
    return table;
  }

  concatenateText(value) {
    // concatenate at 6 characters for small screen and 25 for large
    if (typeof value === 'string') {
      if (MQL.matches) {
        // small screen
        if (value.slice(0, 2) === '19' || value.slice(0, 2) === '20') {
          // only show year on small strings
          value = value.slice(0, 4);
        }
        if (value.length > 9) {
          value = value.slice(0, 6) + '...';
        }
      } else {
        // larger screen
        if (value.length > 30) {
          value = value.slice(0, 25) + '...';
        }
      }
    }
    return value;
  }

  /** Accesses keys, values, and userId to populate each table in Admin panel. 
   * Requires user_id to render user details when clicking on any given row */
  createTableRows(keys, values, userId) {
    return (
      <tr key={values[0]} onClick={this.handleClick} id={userId}>
        {values.map((value, index) => {
          value = this.concatenateText(value);

          return (
            <td key={`${values[0]}-${keys[index]}`} >{value}</td>
          );
        }).filter((value, idx) => idx < MAXCOLUMNCOUNT)}
      </tr>
    );
  }

  render() {
    return (
      <div className="admin-table">
        <Table
          striped
          bordered
          hover
          size="sm"
          responsive
          id={this.props.view + '-table'}>
          <thead>
            {this.createTableHeader()}
          </thead>
          <tbody>
            {this.createTableBody()}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default AdminTable;
