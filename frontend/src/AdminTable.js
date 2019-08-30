import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

class AdminTable extends Component {
  handleClick = (evt) => {
    this.props.getUserDetail(evt);
  }
  
  createTableHeader() {
    const keys = Object.keys(this.props.tableObjs[0]);

    return (
      <tr>
        { keys.map(key => {
          // Remove underscore from key name
          key = key.replace(/_/g, ' ');
          
          return <th key={ key } width='55vw'>{ key }</th> 
        })}
      </tr>
    );
  }

  createTableBody() {
    const table = this.props.tableObjs.map(item => {
      const itemKeys = Object.keys(item);
      const itemValues = Object.values(item);

      return this.createTableRows(itemKeys, itemValues);
    });

    return table;
  }

  createTableRows(keys, values) {
    return (
      <tr key={values[0]} onClick={this.handleClick}>
        {values.map((value, index) => {
          return (
            <td key={`${values[0]}-${keys[index]}`}>{ value }</td>
          );
        })}
      </tr>
    );
  }

  render(){
    return (
      <Table striped bordered hover size="sm" responsive id={this.props.view + '-table'}>
        <thead>
          { this.createTableHeader() }
        </thead>
        <tbody>
          { this.createTableBody() }
        </tbody>
      </Table>
    );
  }
}

export default AdminTable;