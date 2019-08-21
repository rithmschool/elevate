/** Routes for salaries. */

const express = require('express');
const Salary = require('../models/salary');

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

/** POST / {salaryData} =>  {salaries: newSalary} */

router.post('/', async function (req, res, next) {
  try {
    const salary = await Salary.create(req.body);
    return res.status(201).json({ salary }); 
  } catch (err) {
    return next(err);
  }
});

// /** PATCH /[handle] {companyData} => {company: updatedCompany}  */

// router.patch('/:', async function (req, res, next) {
//   try {
//     if ('handle' in req.body) {
//       throw new ExpressError('You are not allowed to change the handle.', 400);
//     }

//     const validation = validate(req.body, companyUpdateSchema);
//     if (!validation.valid) {
//       throw new ExpressError(validation.errors.map(e => e.stack), 400);
//     }

//     const company = await Company.update(req.params.handle, req.body);
//     return res.json({ company });
//   } catch (err) {
//     return next(err);
//   }
// });

// /** DELETE /[handle]  =>  {message: "Company deleted"}  */

// router.delete('/:handle', adminRequired, async function (req, res, next) {
//   try {
//     await Company.remove(req.params.handle);
//     return res.json({ message: 'Company deleted' });
//   } catch (err) {
//     return next(err);
//   }
// });

module.exports = router;
