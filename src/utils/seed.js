const { UserModel } = require("../models/UserModel");
const { BlogModel } = require("../models/BlogModel");
const { databaseConnect, databaseClear, databaseClose } = require("./database");
const { comparePasswords, createJWT, validateJWT } = require("./authHelpers");


async function seedUsers (){
    let userData = [
        {
            username: "alex",
            password: "password"
        },
        {
            username: "pikachu",
            password: "pokemon"
        }
    ];

    let thirdUser = {
        username: "callum",
        password: "supercool"
    }

    console.log("Creating user with .create")
    let callum = await UserModel.create(thirdUser)

    console.log("Calling save on the created user")
    await callum.save();

    console.log("Callum's encrypted password is: " + callum.password);
    let doesSupercoolMatch = await comparePasswords("supercool", callum.password);
    console.log("Callum's password is supercool: " + doesSupercoolMatch);

    // console.log("Creating users from insertMany:");
    // let result = await UserModel.insertMany(userData)
    // If we wanted pre-save on the insertMany, this is the code to do it: 
    console.log("Creating users in bulk by Promise.all over usermodel.create:");
    let result = await Promise.all(userData.map(async (user) => {
        let newUser = await UserModel.create(user);
        return newUser;
    }));

    return result

}

async function seedBlogPosts(usersToUse){
    let blogData = [
        {
        title: "Super Cool blog post",
        content: "Pretend this is 300 words",
        author: usersToUse[0].id,
        headerImage: "https://placehold.co/600x400",
        tags: ["seeded", "blog", "pokemon", "cool beans"],
        categories: ["coding", "travel"]
        },
        {
            title: "Another Cool blog post",
            content: "Pretend this is 10000 words",
            author: usersToUse[1].id,
            headerImage: "https://placehold.co/600x400",
            tags: ["seeded", "blog", "pokemon", "food"],
            categories: ["life", "photography"]
        },
        {
            title: "the third Cool blog post",
            content: "Pretend this is 300 words",
            author: usersToUse[1].id,
            headerImage: "https://placehold.co/600x400",
            tags: ["seeded", "blog", "pokemon", "cool beans"],
            categories: ["coding", "travel"]
        }
    ];

    let result = await BlogModel.insertMany(blogData);
    console.log(result);
    return result;
}


async function seed(){
    
    await databaseConnect();
    await databaseClear();

    let newUsers = await seedUsers();
    console.log("New users about to be given to the seedBlog function");
    console.log(newUsers);
    let newBlogs = await seedBlogPosts(newUsers);

    let newJwt = createJWT(newUsers[0]._id);
    console.log("New JWT: " + newJwt);

    validateJWT(newJwt);

    console.log("Seeded Data!")
    await databaseClose();
}

seed();