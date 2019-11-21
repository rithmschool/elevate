// mock data for seeding the database or testing

const USERS = [
  {
    email: "user1@mail.com",
    first_name: "first_name1",
    last_name: "last_name1",
    is_admin: false,
    current_company: "company1",
    hire_date: "2018-06-23T07:00:00.000Z",
    needs: "needs1",
    goals: "goals1"
  },
  {
    email: "user2@mail.com",
    first_name: "first_name2",
    last_name: "last_name2",
    is_admin: true,
    current_company: "company2",
    hire_date: "2018-10-23T07:00:00.000Z",
    needs: "needs2",
    goals: "goals2"
  }
];

const QUESTIONS = [
  {
    question: "question1",
    response: "",
    resolved: false,
    created_date: "2019-09-01T19:28:53.468Z"
  },
  {
    question: "question2",
    response: "response2",
    resolved: true,
    created_date: "2019-09-01T19:28:33.468Z"
  }
];

const SALARIES = [
  {
    salary: 1.0,
    bonus: 1.0,
    equity: 1.0,
    created_at: "2019-10-01T19:28:24.468Z"
  },
  {
    salary: 2.0,
    bonus: 2.0,
    equity: 2.0,
    created_at: "2019-05-01T19:28:12.468Z"
  }
];

const DOCUMENTS = [
  {
    id: 1,
    user_id: 1,
    title: "contract.pdf",
    counterparty: "Bob Bobson",
    date_submitted: "2010-08-05",
    date_reviewed: null,
    status: "unreviewed",
    url: "theinternet.com"
  },
  {
    id: 2,
    user_id: 1,
    title: "contract2.pdf",
    counterparty: "Rob Robson",
    date_submitted: "2019-08-05",
    date_reviewed: null,
    status: "unreviewed",
    url: "theinternet2.com"
  }
];

module.exports = {
  USERS,
  USER: USERS[0],
  QUESTIONS,
  QUESTION: QUESTIONS[0],
  SALARIES,
  SALARIE: SALARIES[0],
  DOCUMENTS
};
