const { UserModel } = require("../models/UserModel");
const { BlogModel } = require("../models/BlogModel");
const { databaseConnect, databaseClear, databaseClose } = require("./database");


async function seedUsers (){
    let userData = [
        {
            username: "alex",
        },
        {
            username: "pikachu"
        }
    ];

    let result = await UserModel.insertMany(userData);

    console.log(result);
    return result;

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
    let newBlogs = await seedBlogPosts(newUsers);

    console.log("Seeded Data!")
    await databaseClose();
}

seed();