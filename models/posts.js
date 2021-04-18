const mongoose = require("mongoose")
const RatingModel = require("../models/rating")

const postsSchema = new mongoose.Schema({
    title: { type: "string", required: true, maxLength: 20 },
    body: {type: String, maxLength: 100},
    author: {type: mongoose.Schema.Types.ObjectId, ref: "User"}
})


const PostsModel = mongoose.model("Posts", postsSchema)

module.exports = PostsModel