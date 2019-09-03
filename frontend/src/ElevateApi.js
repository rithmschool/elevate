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
    let res = await this.request(`users`)
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
  static async postSalary(data){
    let res = await this.request(`salaries/`, data, "post");
    return res;
  }

  static async getQuestions() {
    let res = await this.request(`questions`)
    return res.questions
  }

  

}

export default ElevateApi;

