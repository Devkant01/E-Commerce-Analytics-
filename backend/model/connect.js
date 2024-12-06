const mongoose = require("mongoose");
const { DATABASE_STRING } = require("../config/config");

mongoose.connect(DATABASE_STRING)
    .then(() => {
    console.log("Database connection status: Connected")
    })
    .catch((e) => {
        console.log("Database connection status: Failed");
        console.log("Error Message: ", e.message);
    })

module.exports = {
    mongoose
}