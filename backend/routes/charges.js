/** Routes for charges. */

const express = require("express");
const router = express.Router();

const Charges = require("../models/charges");
const User = require('../models/User');
//const {getData} = require("../../date.js")

/**add a new charge to the database */
router.post("/new", async function (req, res, next) {
  console.log(req.body.params)
  try {

    const newCharge = await Charges.create(req.body);
    return res.json(newCharge)

  }
  catch (err) {
    return err;
  }

});
/**Get All charges */
router.get("/", async function (req, res, next) {
 
  /**FIX ME PASS IN ACTUAL USER ONCE AUTH IS WORKING */
  let charges = await Charges.findAll();
  if(charges.length === 0) {
    return res.json("there is currently no charges")
  }
  return res.json({ charges });
});

/**GET all outstanding charges for individual user*/
router.get("/:id", async function (req, res, next) {
  req = 1;
  /**FIX ME PASS IN ACTUAL USER ONCE AUTH IS WORKING */
  let charges = await Charges.findChargesDue(req);
  /**put nice message if there is no charges */
  
  return res.json( {charges} );
});


/**update the charge to completed */
router.patch("/", async function (req, res, next) {
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
router.delete("/charges", async function (req, res, next) {
  try {
    const chargeID = await Charges.remove(req.body.params.id);
    return res.json(chargeId);

  }
  catch (err) {
    return err;
  }

});

module.exports = router;