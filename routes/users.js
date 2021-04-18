const { response } = require('express')
const express = require('express')
const UserModel = require('../models/users')
const Router = express.Router()

Router.get("/", async (request, response) => {
    try {
      const getUsers = await UserModel.find()
      return response.json(GetUsers)
    }
    catch(err){
      return response.send("error happened")
    }
})


Router.get("/:id", async (request, response, next) => {
         try {
            const user = await UserModel.findById(request.params.id)
            const userAge = user.getUserAge()
            user.getAvgRating().then((AveRate)=>{
                 let rate = AveRate 
            return  response.json({user,userAge,rate})
            })
         }
         catch(err) {
             return response.send("error happened")
         }



})


Router.post("/", async(request, response) => {

    const userData = request.body
    const userInstance = new UserModel({
        firstname: userData.firstname,
        lastname: userData.lastname,
        email: userData.email,
        dob: userData.dob,
        gender: userData.gender,
        password: userData.password
    })
    console.log(userInstance)
    try {
        const UserSave = await userInstance.save()
        return response.json(UserSave)
    }
    catch (err) {
        return response.json(err)
    }

})

Router.delete("/:id", async(request, response) => {
    try {
        const post = await UserModel.findOneAndRemove(request.params.id);
        return response.json("that post is deleted well");
    }
    catch (err) {
        return response.json(err);
    }
})

Router.patch("/:id", async(request, response) => {
    try {
        const post = await UserModel.updateOne({ _id: request.params.id }, { $set: request.body });
        return response.json(post);
    }
    catch (err) {
        return response.json(err);
    }
})

module.exports = Router