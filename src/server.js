const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (request, response, next) => {

    response.json({
        message: "Hello World!"
    });    
})

app.get("*", (request, response, nex) => {
    response.status(404).json({
        message:" 404 Page not found."
    })
})


app.use((error, request, response, next) => {
    response.json({
        message: "Error occured!",
        error: error.message
    });
})

module.exports = {
    app
}