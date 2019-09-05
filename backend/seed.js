// add in the command line command "test" to seed the test database
process.env.NODE_ENV = process.argv[2] || 'development'

const db = require("./db")
const User = require("./models/user");
const Appointment = require("./models/appointment");
const Salary = require("./models/salary");
const [USER_DATA, SALARY_DATA, APPOINTMENTS_DATA] = require("./seedData");


async function cleanData() {
  try {
    await db.query("DELETE FROM appointments;")
    await db.query("DELETE FROM salaries;")
    await db.query("DELETE FROM users_calendly_users;")
    await db.query("DELETE FROM users;")
    await db.query(`ALTER SEQUENCE users_id_seq RESTART WITH 1;`)
  } catch(err){
      console.log("something went wrong with cleanData", err)
  }
}

async function createTestData() {
    try {
      for(const user of USER_DATA){
        await User.create(user)
      }
       for(const salary of SALARY_DATA){
        await Salary.create(salary)
      }
      for(const apt of APPOINTMENTS_DATA){
        await Appointment.create(apt)
      }
    } catch(err){
      console.log("something went wrong with createTestData", err)
    }
}

async function seedData(){
  try {
    await cleanData()
    await createTestData()
  } catch(err){
    console.log("something went wrong!", err)
  }
}

seedData().then(async function(){
    console.log("ALL DONE!")
    process.exit(0)
})

module.exports = seedData;
