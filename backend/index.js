const express = require("express")
const app = express()
require("dotenv").config()
const cors = require("cors")
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const mongoose = require("mongoose")
mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("Database connected successsfully")
}).catch((err) => {
    console.log(err)
})

app.use("/api", require("./routes/api"));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});