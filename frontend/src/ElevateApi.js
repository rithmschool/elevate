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
    else if (verb === "delete") {
      q = axios.delete(
        `${BASE_URL}/${endpoint}`, { _token, ...params });
    }

    try {
      return (await q).data;
    } catch (err) {
      let message = err.response.data.message;
      throw Array.isArray(message) ? message : [message];
    }
  }


  static async login(data) {
    let res = await this.request(`login`, data, "post");

    return res.token;
  }

  static async signup(data) {
    let res = await this.request(`users`, data, "post");

    return res.token;
  }

  static async getUser(id) {
    let res = await this.request(`users/${id}`);

    return res.user;
  }

  static async updateUser(userId, data){
    let res = await this.request(`users/${userId}`, data, "patch");
    return res.user;
  }
  static async getUsers() {
    let res = await this.request(`users`);

    // Format hire_date for each user
    res.users.forEach(user => {
      user.hire_date = user.hire_date.slice(0, 10);
    });

    return res.users
  }
  /** gets the latest slaray for a specific user
   * input uesrId
   * return salary object
  */
  static async getLatestSalary(userId) {
    let res = await this.request(`salaries/${userId}`);
    return res.salaries
  }
/** update salary
 * input: userId and salary
 * return new updates salary
 */
  static async updateSalary(userId, data) {
    let res = await this.request(`salaries/${userId}`, data, "patch");
    return res
  }

  static async getQuestions() {
    let res = await this.request(`questions`);

    // Format created_date for each question
    res.questions.forEach(question => {
      question.created_date = question.created_date.slice(0, 10);
    });

    return res.questions
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
  static async getCharges(id) {
    
    let res = await this.request(`charges/${id}`);
    console.log(res,"RES")
    return res;
  }

  static async allChargesForUser(id) {
    let res = await this.request(`charges/user/${id}`);
    return res;
  }

  static async deleteCharge(id) {
    console.log("here")
    let res = await this.request(`charges/${id}`,"",'delete');
    return res;
  }

}

export default ElevateApi;

