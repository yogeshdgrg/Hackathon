const mongoose = require("mongoose")

const postSchema = new mongoose.Schema(
  {
    outputType: {
      type: String,
      enum: ["Image", "Video", "Text"],
      default:"Image"
    },

    tool: String,
    
    toolModel:String,

    upVote: {
      type: Number,
      default: 0
    },

    downVote: {
      type: Number,
      default: 0
    },

    saves:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User"
    },

    title: String,

    promt: {
      type: String,
      required: true,
    },

    image: {
      type: String,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    createdAt:{
      type:Date,
      default:Date.now
    }

  }
)

const Post = mongoose.model("Post", postSchema)

module.exports = Post
