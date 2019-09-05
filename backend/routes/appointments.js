// Endpoints for appointments 

const Appointment = require("../models/appointment");
const express = require("express");
const router = new express.Router();
const ExpressError = require("../helpers/expressError");
const { ensureCorrectUser, adminRequired} = require('../middleware/auth');

// GET--- endpoint for getting all appointment
router.get('/', adminRequired, async function (req, res, next) {
    try {
        let appointments = await Appointment.findAll();
        return res.json({ appointments });
    } catch (err) {
        return next(err);
    }
});

// GET---endpoint for getting appointments matched with params user id
router.get('/:id', ensureCorrectUser, async function (req, res, next) {
    try {
        let appointments = await Appointment.findByUserId(req.params.id);
        return res.json({ appointments });
    } catch (err) {
        return next(err);
    }
});

module.exports = router;