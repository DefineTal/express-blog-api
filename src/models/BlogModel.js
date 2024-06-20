// - Title
// - Content
// - User (posted by)
// - Created date
// - Like
// - Image upload
// - Category
// - Tags/keywords
// - Audit history
//     - user
//     - timestamp

const mongoose = require("mongoose");


const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: String, //replace later with mongoose object id
        required: true
    },
    likes: {
        type: [String], // replace later with mongoose object id
        required: false
    },
    headerImage: {
        type: String, // URL to the file/image storage provider
        required: false
    },
    tags: { // keywords defined by blog post author
        type: [String], // ["life", "travel", "photography"]
        required: true
    },
    categories: { // post category defined by website admin/developer
        type: [String], // ["life", "travel", "photography"]
        enum: ["life", "travel", "photography", "coding"],
        required: true
    },
    editHistory: {
        type: [{user: String, timestamp: Date}],
        required: false
    }
},

{
    timestamps: true
})

const BlogModel = mongoose.model("Blog", blogSchema);

module.export = {
    BlogModel
}