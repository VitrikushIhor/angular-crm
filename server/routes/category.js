const express = require("express")
const password = require("passport")
const controller = require("../controllers/category")
const router = express.Router()
const upload = require("../middleware/upload")

// /api/category
router.get("/", password.authenticate("jwt", {session: false}), controller.getAll)

// /api/category/:id
router.get("/:id", password.authenticate("jwt", {session: false}), controller.getById)

// /api/category/:id
router.delete("/:id", password.authenticate("jwt", {session: false}), controller.deleteById)


// /api/category/:id
router.post("/", password.authenticate("jwt", {session: false}), upload.single("image"), controller.create)


// /api/category/:id
router.patch("/:id", password.authenticate("jwt", {session: false}), upload.single("image"), controller.update)


module.exports = router
