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

/** PATCH / {salaryData} => {salary: updatedSalary}  
 * looks up and returns the latest salary id by user id obtained from route params
*/

router.patch('/:id', authRequired, async function (req, res, next) {
  try {
    const userId = req.params.id
    const salary = await Salary.updateWithUserId(userId, req.body);
    return res.json({ salary });
  } catch (err) {
    return next(err);
  }
});

/** DELETE /  =>  {message: "Salary deleted"}  */

router.delete('/:id', authRequired, async function (req, res, next) {
  try {
    await Salary.remove(req.params.id);
    return res.json({ message: 'Salary deleted' });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
