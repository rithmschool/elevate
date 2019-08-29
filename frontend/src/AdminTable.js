import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

class AdminTable extends Component {
  handleClick = (evt) => {
    this.props.getUserDetail(evt);
  }

  render(){
    const keys = Object.keys(this.props.tableObjs[0]);

    return (
      <Table striped bordered hover size="sm" responsive id="users-table">
        <thead>
          <tr>
            { keys.map(key => {
              key = key.replace(/_/g, ' ');
              return <th key={ key } width='55vw'>{ key }</th> 
            })}
          </tr>
        </thead>
        <tbody>
          {this.props.tableObjs.map(item => {
            const itemKeys = Object.keys(item)
            const itemValues = Object.values(item);
            return (
              <tr key={itemValues[0]} onClick={this.handleClick}>
                {itemValues.map((value, index) => {
                  return (
                    <td key={`${itemValues[0]}-${itemKeys[index]}`}>{ value }</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </Table>
    )
  }
}

export default AdminTable;