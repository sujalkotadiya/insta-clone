const express = require("express")
const app = express()
const mongoose = require("mongoose")
const { mongoUrl } = require("./keys")
const cors = require("cors")
const port = process.env.port || 1235
const path=require("path")


app.use(cors())

require('./models/model')
require('./models/post')

app.use(express.json())
app.use(require("./routes/auth"))
app.use(require("./routes/createPost"))
app.use(require("./routes/user"))

mongoose.connect(mongoUrl)
mongoose.connection.on("connected", () => {
    console.log("connected to database")
})

app.use(express.static(path.join(__dirname,"./frontend/dist")))

app.get("*",(req,res)=>{
    res.sendFile(
        path.join(__dirname,"./frontend/dist/index.html"),
        function (err) {
            res.status(500).send(err)
        }
    )
})

app.listen(port, () => {
    console.log("Server is running on port 5339")
})