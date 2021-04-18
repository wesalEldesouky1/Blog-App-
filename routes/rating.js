const { response } = require('express')
const express = require('express')
const RatingModel = require('../models/rating')
const Router = express.Router()

Router.get("/", async (request, response) => {
    try {
        const getRating = await RatingModel.find()
        return response.json(getRating)
    }
    catch(err) {
        response.send("error happened")

    }
})


Router.get("/:id", async (request, response, next) => {
    try {
       const rating = RatingModel.findById(request.params.id).populate("author").populate("onId")
       return response.jsin(rating)
    }
    catch(err) {
        return response.send("error happened")
    }
})



Router.post("/", async (request, response) => {

    const ratingData = request.body
    const ratingInstance = new RatingModel({
        rating: ratingData.rating,
        onId: ratingData.onId,
        onModel: ratingData.onModel,
        author: ratingData.author

    })
    console.log(ratingInstance)
    try {
    const rating = atingInstance.save()
    return response.json(rating)

    }
    catch(err) {
        return response.send ("error happened")
    }
})


Router.delete("/:id", async(request, response) => {
    try {
        const post = await RatingModel.findOneAndRemove(request.params.id);
        return response.json("the post has been deleted successfuly");
    }
    catch (err) {
        return response.json(err);
    }
})

Router.patch("/:id", async(request, response) => {
    try {
        const post = await RatingModel.updateOne({ _id: request.params.id }, { $set: request.body });
        return response.json(post);
    }
    catch (err) {
        return response.json(err);
    }
})

module.exports = Router