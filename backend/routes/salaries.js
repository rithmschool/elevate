/** Routes for salaries. */

const express = require('express');
const Salary = require('../models/salary');
const { ensureCorrectUser, authRequired } = require('../middleware/auth');

const router = new express.Router();

/** GET /  =>  {salaries: [salaryData, ...]}  */

router.get('/', async function (req, res, next) {
  try {
    const salaries = await Salary.findAll();
    return res.json({ salaries });
  } catch (err) {
    return next(err);
  }
});

/** GET / a specific salary  =>  {salaries: salary}  
 *  looks up and returns the latest salary id by user id obtained from route params
*/

router.get('/:id', authRequired, async function (req, res, next) {
  try {
    const userId = req.params.id
    const salaries = await Salary.findLatestSalaryByUserId(userId);
    return res.json({ salaries });
  } catch (err) {
    return next(err);
  }
});

/** POST / {salaryData} =>  {salaries: newSalary} */

router.post('/', authRequired, async function (req, res, next) {
  try {
    const salary = await Salary.create(req.body);
    return res.status(201).json({ salary });
  } catch (err) {
    return next(err);
  }
});

/** PATCH / {salaryData} => {salary: updatedSalary}  */

router.patch('/:id', async function (req, res, next) {
  try {
    //write logic to look up salary id from user_id fed in from request
    const salary = await Salary.update(id, req.body);
    return res.json({ salary });
  } catch (err) {
    return next(err);
  }
});

/** DELETE /  =>  {message: "Salary deleted"}  */

router.delete('/:id', async function (req, res, next) {
  try {
    //write logic to look up salary id from user_id fed in from request
    const id = req.body.id;
    await Salary.remove(id);
    return res.json({ message: 'Salary deleted' });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
