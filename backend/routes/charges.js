/** Routes for charges. */

const express = require("express");
const router = express.Router();
const { ensureCorrectUser, authRequired, adminRequired } = require('../middleware/auth');
const Charges = require("../models/charges");
const User = require('../models/User');
//const {getData} = require("../../date.js")

/**add a new charge to the database */
router.post("/new" , adminRequired, async function (req, res, next) {
  try {
    const newCharge = await Charges.create(req.body);
    return res.json(newCharge)

  }
  catch (err) {
    return err;
  }

});
/**Get All charges for admin */
router.get("/", authRequired,adminRequired, async function (req, res, next) {

  let charges = await Charges.findAll();
  if (charges.length === 0) {
    return res.json("there is currently no charges")
  }
  return res.json({ charges });
});

/**GET all outstanding charges for individual user*/
router.get("/:id", authRequired, ensureCorrectUser, async function (req, res, next) {
  try {
  const userId = req.params.id;
  let charges = await Charges.findChargesDue(userId);
  /**put nice message if there is no charges */
  return res.json({ charges });
  } catch(err) {
    return next(err);
  }
});

/**GET all user charges for individual user*/
router.get("/user/:id", adminRequired, async function (req, res, next) {
  try {
  const userId = req.params.id;
  let charges = await Charges.chargesForUser(userId);
  /**put nice message if there is no charges */
  return res.json({ charges });
  } catch(err) {
    return next(err);
  }
});


/**update the charge to completed */
router.patch("/" ,authRequired, async function (req, res, next) {
  var dateObj = new Date();
  var month = dateObj.getUTCMonth() + 1; //months from 1-12
  var day = dateObj.getUTCDate();
  var year = dateObj.getUTCFullYear();
  let date = year + "/" + month + "/" + day;
  try {
    const chargeDetails = await Charges.getCharge(req.body.chargeId);
    if (chargeDetails === undefined) {
      return res.json("No charge exits or already payed")
    }
    const status = await Charges.makeStripePayment(chargeDetails, req.body.token);
    if (status === 'succeeded') {
      let updateData = {
        payment_date: date,
        paid: "t"
      }
      let updateTable = await Charges.update(req.body.chargeId, updateData);
    }

    return res.json({ status });


  }
  catch (err) {
    return res.json(err.message);
  }
});


/**delete a charge in the db by the ADMIN ONLY */
router.delete("/:chargeId", adminRequired ,async function (req, res, next) {
  
  try {
    const response = await Charges.remove(req.params.chargeId);
    if(!response) {
      return res.json("this charge does not exist")
    }
    return res.json("Charge deleted!");

  }
  catch (err) {
    return err;
  }

});

module.exports = router;