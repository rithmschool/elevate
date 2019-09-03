import React, { Component } from "react";
import ElevateApi from './ElevateApi'
import { Button } from 'reactstrap';
import PaymentForm from "./PaymentForm"
class UserCharge extends Component {
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
   /**FIXME: payment form */
    render() {
        const charge = this.props
       
       
        return (
                <tbody>
                    <tr >
                        <td>{charge.due_date.slice(0, 10)}</td>
                        <td>${charge.amount}</td>
                        <td>{charge.description}</td>
                        
                        </tr>
                        <PaymentForm />
                </tbody>
                 


        );
    }
}

export default UserCharge;