const mongoose = require("mongoose");


async function databaseConnect(){

    let databaseURL = process.env.DATABASE_URL 
    || 
    "mongodb+srv://definesmug:RVjPVKyKZw$iV9x@clusteracademy.9oamikv.mongodb.net/?retryWrites=true&w=majority&appName=ClusterAcademy";

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