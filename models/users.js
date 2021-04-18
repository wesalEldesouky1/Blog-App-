const mongoose = require("mongoose")
const RatingModel = require("../models/rating")
const bcrypt = require('bcrypt')
const userSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    dob: Date,
    email: { type: "String" }, 
    gender: String,
    password: { type: "String" }    
})

userSchema.methods.getAvgRating = async function () {
    try {
        const rating = await RatingModel.find({ onId: this._id });
        console.log(rating)
        let avgRating = 0;
        let count = 0;
        for (const rateingObj of rating) {
            avgRating += rateingObj.rateing;
            count += 1;
        }
        return avgRating / count;
    } catch (err) {
        console.log(err);
    }
};

userSchema.methods.getUserAge =  function () {
    
   var ageDifMs = Date.now() - this.dob.getTime();
   var ageDate = new Date(ageDifMs); 
   return Math.abs(ageDate.getUTCFullYear() - 1970);
};

userSchema.statics.countUsersByGender = function (gender, cb) {
    this.count({gender: gender }, cb)
}

userSchema.pre('save', function (next) {
    if (this.isNew) {
        bcrypt.hash(this.password, 10, (err, hashedPasswoed) => {
            this.password = hashedPasswoed
            next()
        })
    } else {
        next()
    }
})   

const UserModel = mongoose.model("User", userSchema)

UserModel.countUsersByGender("male", (err, count) => { console.log(count)})
module.exports = UserModel