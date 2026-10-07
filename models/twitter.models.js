const mongoose = require('mongoose');

const TwitterSchema = new mongoose.Schema({
    profilePic: String,
    fullName: String,
    userName: String,
    bio: String,
    companyName: String,
    city: String,
    portfolioLink: String,
    hamdle: String,
    followersCount: Number,
    followingCount: Number,
    isOnline: Boolean,
});

const Twiiter = mongoose.model('Twitter', TwitterSchema);
module.exports = Twiiter;