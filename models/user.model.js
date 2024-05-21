const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email: String,
    password: String,
    username: String,
    mobileNumber: String,
    role: String,
    orders: Array
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;