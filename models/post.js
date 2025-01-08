const mongoose = require("mongoose")
const { ObjectId } = mongoose.Schema.Types

const postSchema = new mongoose.Schema({
    body: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        require: true
    },
    likes: [{
        type: ObjectId,
        ref: "user"
    }],
    comments: [{
        comment: { type: String },
        postedBy: { type: ObjectId, ref: "user" }
    }],
    postedBy: {
        type: ObjectId,
        ref: "user"
    }

}, { timestamps: true })

mongoose.model("POST", postSchema)