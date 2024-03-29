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
      let message = err.message;
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

  static async getUser(userId) {
    let res = await this.request(`users/${userId}`);

    return res.user;
  }
  // Currently unused route with no endpoint
  /* static async getDocument(id) {
    let res = await this.request(`documents/${id}`);

    return res.doc;
  } */

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

  static async getDocuments() {
    let res = await this.request(`admin/documents`);

    res.documents.forEach(document => {
      document.date_submitted = document.date_submitted.slice(0, 10);
    });

    return res.documents;
  }

  static async forgotPassword(email) {
    let res = await this.request(`password/`, email, "post");
    return res;
  }

  static async signinGoogle(token) {
    let res = await this.request("login/ggtokensignin", { token }, "post");
    return res.token;
  }

  static async verifyResetPasswordToken(resetPasswordToken) {
    let res = await this.request(`password/${resetPasswordToken}`);
    return res;
  }

  static async updatePassword(id, resetPasswordToken, password) {
    let res = await this.request(`password/${id}`, { resetPasswordToken, password }, "patch");
    return res;
  }

  static async deleteUser(id) {
    await this.request(`users/${id}`, {}, "delete");
  }

  static async getUserDocuments(userId) {
    let res = await this.request(`documents/manage`, { id: userId });
    return res;
  }

  static async addToDB(doc) {
    let res = await this.request("upload/db", doc, "post");
    return res;
  }

  static async postNewsletterSignUp(data) {
    let res = await this.request(`newsletter/`, data, "post");
    return res;
  }

  static async getNewsletter(data) {
    let res = await this.request(`newsletter/`, data, "get");
    return res;
  }
}

export default ElevateApi;
