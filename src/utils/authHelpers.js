const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
require("dotenv").config();


// Compare raw password to encrypted password
async function comparePasswords(plaintextPassword, encryptedPassword) {
    let doesPasswordMatch = false;

    doesPasswordMatch = await bcrypt.compare(plaintextPassword, encryptedPassword);
    
    return doesPasswordMatch;
}

// Create a JWT 
function createJWT(userID){
    let newJwt = jwt.sign(
        // Payloard of data
        {id: userID},
        // Secret key for JWT signature
        process.env.JWT_KEY,

        // Options for JWT expiry
        {
            expiresIn: "7d"
        }
    )

    return newJwt;
}


// Validate a JWT
function validateJWT(jwtToValidate){
    let isJwtValid = false;

    jwt.verify(jwtToValidate, process.env.JWT_KEY, (error, decodedJwt) => {
        if (error){
            throw new Error("user JWT is not valid!");
        }
        console.log("Decoded JWT:")
        console.log(decodedJwt);

        isJwtValid = true;
    });
    return isJwtValid;
}

module.exports = {
    comparePasswords,
    createJWT,
    validateJWT
}