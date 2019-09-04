import React, { Component } from "react";
import ElevateApi from './ElevateApi';
import { Button } from 'reactstrap';
import PaymentForm from "./PaymentForm";

class UserCharge extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checking: false,
            chargeRemoved: false
        }
        this.handleClick = this.handleClick.bind(this);
        this.deleteCharge = this.deleteCharge.bind(this);
    }

    handleClick(e) {
        e.preventDefault();
        if (!this.state.checking) {
            this.setState({ checking: true })
        }
        else {
            this.setState({ checking: false })
        }
    }

    async deleteCharge(e) {
        e.preventDefault();
        let deleteCharge = await ElevateApi.deleteCharge(this.props.id)
        if (deleteCharge) {
            this.setState({ chargeRemoved: true, checking: false })
        }
    }
    /**FIXME: payment form */
    render() {
        let { due_date, amount, description, id, handlePayment } = this.props;
        return (
            <tbody>
                <tr >
                    <td> <Button id={id} onClick={handlePayment} size="sm" outline color="success" >Pay Now</Button></td>
                    <td> {due_date.slice(0, 10)}</td>
                    {/* <td>${parseFloat(amount).toFixed(2)}</td> */}
                    <td>{parseFloat(amount).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
                    <td>{description} </td>
                    <td><Button className="m-1" size="sm" outline color="danger">X</Button></td>
                </tr>


            </tbody>



        );
    }
}

export default UserCharge;