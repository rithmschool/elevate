import axios from "axios";

const BASE_URL = process.env.BASE_URL || "http://localhost:3001";

class ElevateApi {
  static async request(endpoint, params = {}, verb = "get") {
    let _token = localStorage.getItem("token");

    console.debug("API Call:", endpoint, params, verb);

    let q;

    if (verb === "get") {
      q = axios.get(
        `${BASE_URL}/${endpoint}`, { params: { _token, ...params } });
    } else if (verb === "post") {
      q = axios.post(
        `${BASE_URL}/${endpoint}`, { _token, ...params });
    } else if (verb === "patch") {
      q = axios.patch(
        `${BASE_URL}/${endpoint}`, { _token, ...params });
    }

    try {
      return (await q).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.message;
      throw Array.isArray(message) ? message : [message];
    }
  }


  static async login(data) {
    let res = await this.request(`login`, data, "post");

    return res.token;
  }

  static async signup(data) {
    console.log("data", data)
    let res = await this.request(`users`, data, "post");

    return res.token;
  }

  static async getUser(id) {
    let res = await this.request(`users/${id}`);

    return res.user;
  }
  static async makePayment(token, chargeId) {
    let res = await this.request(`charges`, { token, chargeId }, "patch");
    return res;
  }

  

  static async addCharge(data) {

    let res = await this.request('charges/new', data.invoice, "post");
    return res;
  }

  // Get charges for a single user,using the users id.
  static async getCharges() {
    let res = await this.request('charges');
    return res;
  }
}



export default ElevateApi;