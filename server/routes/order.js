const express = require("express")
const controller = require("../controllers/order")
const password = require("passport");
const router = express.Router()


// /api/order
router.get("/", password.authenticate("jwt", {session: false}), controller.getAll)
// /api/order
router.post("/", password.authenticate("jwt", {session: false}), controller.create)


module.exports = router
