const { configDotenv } = require("dotenv");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
require("dotenv").config();

async function databaseConnect(){

    let databaseURL = process.env.DATABASE_URL 
    || 
    "mongodb+srv://taliesinstudy:STM9CN8IpEfDMj3B@somecoolclustername.na08wmo.mongodb.net/?retryWrites=true&w=majority&appName=SomeCoolClusterName";

    await mongoose.connect(databaseURL);
    console.log("Database connecting completed!");
}

async function databaseClose(){
    // Disconnect from database
    await mongoose.connection.close();
    console.log("DB is disconnected!");
}

async function databaseClear(){
    // Clear data present on database
    await mongoose.connection.dropDatabase();
    console.log("Data has been wiped!")
}


module.exports = {
    databaseConnect,
    databaseClose,
    databaseClear
}