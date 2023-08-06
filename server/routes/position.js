const express = require("express")
const controller = require("../controllers/position")
const password = require("passport");
const router = express.Router()


// /api/position
router.get("/:categoryId", password.authenticate("jwt", {session: false}), controller.getByCategory)
// /api/position
router.post("/", password.authenticate("jwt", {session: false}), controller.create)

// /api/position
router.patch("/:id", password.authenticate("jwt", {session: false}), controller.update)


// /api/position
router.delete("/:id", password.authenticate("jwt", {session: false}), controller.deleteById)


module.exports = router
