const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const morgan = require("morgan")
const authRoutes = require("./routes/auth")
const analyticsRoutes = require("./routes/analytics")
const categoryRoutes = require("./routes/category")
const orderRoutes = require("./routes/order")
const positionRoutes = require("./routes/position")
const mongoose = require("mongoose")
const passport = require("passport")
const app = express()

mongoose.connect("mongodb+srv://vitrikushihor0101:Hot1991darkrr@cluster0.a55irtp.mongodb.net/?retryWrites=true&w=majority").then(() => console.log("MongoDb conected"))
	 .catch(error => console.log(error))

app.use(passport.initialize())
app.use("/uploads", express.static("uploads"))
require("./middleware/passport")(passport)

app.use(morgan("dev"))
app.use(cors())

app.use(bodyParser.urlencoded({
	extended: true
}))
app.use(bodyParser.json())


app.use("/api/auth", authRoutes)

app.use("/api/analytics", analyticsRoutes)

app.use("/api/category", categoryRoutes)

app.use("/api/order", orderRoutes)

app.use("/api/position", positionRoutes)

module.exports = app
