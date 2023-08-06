const express = require("express")
const controller = require("../controllers/analytics")
const password = require("passport");
const router = express.Router()


// /api/analytics/overview
router.get("/overview", password.authenticate("jwt", {session: false}), controller.overview)
// /api/analytics/analytics
router.get("/analytics", password.authenticate("jwt", {session: false}), controller.analytics)


module.exports = router
