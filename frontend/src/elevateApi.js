import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

class ElevateApi {
  static async request(endpoint, params = {}, verb = "get") {
    let _token = localStorage.getItem("token");
    console.debug("API Call:", endpoint, params, verb);

    let q;

    if (verb === "get") {
      q = axios.get(`${BASE_URL}/${endpoint}`, {
        params: { _token, ...params }
      });
    } else if (verb === "post") {
      q = axios.post(`${BASE_URL}/${endpoint}`, { _token, ...params });
    } else if (verb === "patch") {
      q = axios.patch(`${BASE_URL}/${endpoint}`, { _token, ...params });
    } else if (verb === "delete") {
      q = axios.delete(`${BASE_URL}/${endpoint}`, {
        params: { _token, ...params }
      });
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

  static async updateUser(userId, data) {
    let res = await this.request(`users/${userId}`, data, "patch");
    return res.user;
  }
  static async getUsers() {
    let res = await this.request(`users`);

    // Format hire_date for each user
    if (res.users) {
      res.users.forEach(user => {
        // check if the user has hire_date then format
        user.hire_date = user.hire_date && user.hire_date.slice(0, 10);
      });
    }

    return res.users;
  }

  static async getLatestSalary(userId) {
    let res = await this.request(`salaries/${userId}`);
    return res.salaries;
  }

  static async updateSalary(userId, data) {
    let res = await this.request(`salaries/${userId}`, data, "patch");
    return res;
  }
  static async postSalary(data) {
    let res = await this.request(`salaries/`, data, "post");
    return res;
  }

  static async getQuestions() {
    let res = await this.request(`questions`);

    // Format created_date for each question
    res.questions.forEach(question => {
      question.created_date = question.created_date.slice(0, 10);
    });

    return res.questions;
  }

  static async deleteUser(id) {
    await this.request(`users/${id}`, {}, "delete");
  }
}

export default ElevateApi;
