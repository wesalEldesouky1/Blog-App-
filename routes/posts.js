const { response } = require('express')
const express = require('express')
const PostsModel = require('../models/posts')
const Router = express.Router()


Router.get("/", async( request, response) => {
    try {
        const post = await PostsModel.find();
        return response.json(post);
    }
    catch (err) {
        return response.json(err);
    }
})


Router.get("/:id", async (request, response, next) => {
   try {
       const post = await PostsModel.findById(request.params.id).populate("author");
       user.getAvgRating().then((rateofpost)=>{
        let rate = rateofpost 
       return response.json({post, rate})
       })
       }
   
   catch (err) {
        return response.json(err)
   }
})
Router.post("/", async (request, response) => {
    console.log(request.body)
    const postData = request.body
    const postInstance = new PostsModel({
        title: postData.title,
        body: postData.body,
        author: postData.author,
    })
    console.log(postInstance)
    try {
        const savepost = await postInstance.save()
        return response.json(savepost)
    }
    catch (err) {
        return response.json(err)
    }

})

Router.delete("/:id", async(request, response) => {
    try {
        const post = await PostsModel.findOneAndRemove(request.params.id);
        return response.json("the post has been deleted successfuly");
    }
    catch (err) {
        return response.json(err);
    }
})

Router.patch("/:id", async(request, response) => {
    try {
        const post = await PostsModel.updateOne({ _id: request.params.id }, { $set: request.body });
        return response.json(post);
    }
    catch (err) {
        return response.json(err);
    }

})

module.exports = Router