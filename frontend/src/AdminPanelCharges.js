import React, { Component } from "react";
import ElevateApi from './ElevateApi'
import { Button } from 'reactstrap';
class AdminPanelCharges extends Component {
   constructor(props){
        super(props);
        this.state = {
            checking:false,
            chargeRemoved:false
        }
     this.handleClick = this.handleClick.bind(this);
     this.deleteCharge = this.deleteCharge.bind(this);
   }
   
   handleClick(e) {
       e.preventDefault();
       if (!this.state.checking) {
        this.setState({checking:true})
       }
       else {
           this.setState({checking:false})
       }
   }

   async deleteCharge(e) {
    e.preventDefault();
    let deleteCharge = await ElevateApi.deleteCharge(this.props.id)
    if(deleteCharge) {
        this.setState({chargeRemoved:true, checking:false})
    }
   }
    render() {
        console.log(this.props)
        const charge = this.props
        let paid = "outstanding charge"
        if (charge.paid === true && charge.payment_date !== null) {
            paid = charge.payment_date.slice(0, 10)
        }

        let message;
        let button;
        if (!this.state.checking && !this.state.chargeRemoved) {
            button = <Button size="sm"  color="danger" onClick={this.handleClick}>Remove this charge</Button>
        }
       else if (!this.state.chargeRemoved) {
        button =  <div>
             <p><strong>Are you sure?</strong></p>
             <Button onClick={this.deleteCharge}>Yes</Button> <Button onClick = {this.handleClick}>Cancel</Button>
         </div>
       } 
       else if (this.state.chargeRemoved) {
        message = "Charge Removed!"
       }
       
        return (
                <tbody>
                    <tr >
                        <td> {paid}</td>
                        <td>${charge.amount}</td>
                        <td>{charge.description}</td>
                        <td>{charge.due_date.slice(0, 10)}</td>
                        
                        </tr>
                        {button}
                        {message}
                </tbody>
                 


        );
    }
}

export default AdminPanelCharges;