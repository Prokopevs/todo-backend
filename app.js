const express = require("express")
const app = express()
const tasks = require("./routes/tasks")
const connectDB = require("./db/connect")
require("dotenv").config()
const notFound = require("./middleware/not-found")
const errorHandlerMiddleware = require("./middleware/error-handler")
var cors = require('cors')
//middleware
app.use(express.static("./"))
app.use(express.json())

// routes
app.use(cors())
app.use("/app/v1/tasks", tasks)
app.use(notFound)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 3500
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(port, console.log(`Server is listening on port ${port}...`))
    } catch (error) {
        console.log(error)
    }
}

start()
