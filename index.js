const express = require('express')
const mongoose = require("mongoose")
const userRouter = require("./routes/users")
const postRouter = require("./routes/posts")
const ratingRouter = require("./routes/rating")

mongoose.connect("mongodb://localhost:27017/blogApp", {
    useNewUrlParser: true
} ,(err) => {
    if (err) return console.error(err)
    console.log("connected to db")

})
const app = express()

app.use(express.json())
app.use("/users",userRouter)
app.use("/posts",postRouter)
app.use("/ratings",ratingRouter)

app.listen(3000, (err) =>{
    if (err) return console.log(err)
    console.log("started server on port 3000")
})