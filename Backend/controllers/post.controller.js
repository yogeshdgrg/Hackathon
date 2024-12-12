const uploadImageOnCloudinary = require("../middlewares/cloudinary")
const Post = require("../models/post.model")
const timeAgo = require("../timeDiff")

const uploadPost = async (req, res) => {
  const { outputType, tool, toolModel, title, promt, saves } = req.body
  const imagePath = req?.file?.path 
if(imagePath){
  try {
    const image = await uploadImageOnCloudinary(imagePath)
    // console.log("11 m: ",image)
    const post = await Post.create({
      image: image || "",
      outputType: outputType || null,
      tool,
      toolModel: toolModel || null,
      title: title || null,
      promt: promt || null,
      createdBy: req.user.id,
    })
    return res.json(post)
  } catch (error) {
    return res.status(500).json({ error })
  }
}

else{
  try {
    const post = await Post.create({
      // image: image || "", 
      outputType: outputType || null,
      tool,
      toolModel: toolModel || null,
      title: title || null,
      promt: promt || null,
      createdBy: req.user.id,
    })
    return res.json(post)
  } catch (error) {
    return res.status(500).json({ error })
  }
}
}


const getPosts = async (req, res) => {
  try {
    const posts = await Post.find({}).populate(
      "createdBy",
      "-email -password -createdAt -updatedAt"
    )
    if (!posts) {
      return res.json({
        msg: "No posts yet",
      })
    }

    const postsWithTimeAgo = posts.map((post) => ({
      ...post.toObject(), // Convert Mongoose document to plain JS object
      timeAgo: timeAgo(post.createdAt),
    }))

    return res.json(postsWithTimeAgo)
  } catch (err) {
    res.json(err)
  }
}

const getUserPosts = async (req, res) => {
  try {
    const posts = await Post.find({ createdBy: req.user.id }).sort({createdAt:-1})
    if (!posts || posts.length === 0) {
      return res.json({ msg: "User doesnot post anything yet..." })
    }
    // const postCount = posts.length
    return res.json({ posts })
  } catch (error) {
    res.status(500).json({ error })
  }
}


module.exports = { uploadPost, getPosts, getUserPosts }
