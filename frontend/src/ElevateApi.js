import axios from "axios";


const BASE_URL = process.env.BASE_URL || "http://localhost:3001";

class ElevateAPI {
  static async request(endpoint, params = {}, verb = "get") {
    // for now, hardcode a token for user "testuser"


    console.debug("API Call:", endpoint, params, verb);
    console.log(params)
    let q;

    if (verb === "get") {
      q = axios.get(
        `${BASE_URL}/${endpoint}`, {params } );
    } else if (verb === "post") {
      q = axios.post(
        `${BASE_URL}/${endpoint}`, {params});
    } else if (verb === "patch") {
      q = axios.patch(
        `${BASE_URL}/${endpoint}`, { ...params });
    }

    try {

      return (await q).data;

    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // User making a payment.
  // Inputs: token - pass in token.id from stripe API
  // ChargeId - 
  static async makePayment(token, chargeId) {
    let res = await this.request(`charges`, { token, chargeId }, "patch");
    return res;
  }

  // Admin creating a new charge. formData looks like: 
  //      { 
  //       invoice: {
  //        username: ""
  //        amount: Number
  //        due_date: "YYYY-MM-DD",
  //        description: ""}
  //      }

  static async addCharge(formData) {
    console.log(formData);
    let res = await this.request('charges/new', formData.invoice, "post");
    console.log(res);
    return res;
  }

  // Get charges for a single user. Uses token to find proper user.
  static async getCharges() {
    let res = await this.request('charges');
    return res;
  }
}


export default ElevateAPI;
