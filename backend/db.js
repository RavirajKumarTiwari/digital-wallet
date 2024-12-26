// We need to support 3 routes for the user authentication:
// 1. Allow user to sign up.
// 2. Allow user to sing in.
// 3. Allow user to update their information (firstName, lastName, password).

const mongoose = require("mongoose");

mongoose.connect(
    "mongodb+srv://raviraj:Raviraj1234567@cluster0.thdnm.mongodb.net/paytm"
);


const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 100,
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
    },
    firstName: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 50,
    },
    lastName: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 50,
    },
});

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to User model
        ref: "User",
        required: true,
    },
    balance: {
        type: Number,
        required: true,
    },
});

const Account = mongoose.model("Account", accountSchema);
const User = mongoose.model("User", userSchema);

module.exports = { User, Account };
