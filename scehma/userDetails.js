const mongoose = require("mongoose");


const UserDetailsScehma = new mongoose.Schema(
{
    fname: String,
    lname: String,
    email:String,
    password:String,
    userType:String
},
{
    collection: "UserInfo",
}
);

mongoose.model("UserInfo", UserDetailsScehma)
