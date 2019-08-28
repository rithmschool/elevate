import React from "react";
import elevateApi from './ElevateApi';
import Charge from './Charge';

class ChargeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      charges: [],
      loading: true
    }
  }
  // Get all charges on first render
  async componentDidMount() {
    let { charges } = await elevateApi.getCharges();
    this.setState({ charges, loading: false })
  }

  render() {
    let charges;
    // If after load there are no charges:
    if (!this.state.loading) {
      if (this.state.charges.length === 0) {
        charges = <h1>You currently have no charges!</h1>
      }
      // If after load there are charges:
      else {
        charges = this.state.charges.map(charge => {
          return <Charge key={charge.id} {...charges}></Charge>
        });
      }
    }

    // Return charges
    return (
      <div>
        {charges}
      </div>
    )
  }
}

export default ChargeList;