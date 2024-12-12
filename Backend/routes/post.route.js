const express = require("express")
const upload = require("../middlewares/multer")
const {
  uploadPost,
  getPosts,
  getUserPosts,
} = require("../controllers/post.controller")
const checkAuth = require("../middlewares/auth")

const router = express.Router()

router.post("/uploadPost", checkAuth, upload.single("file"), uploadPost)
router.get("/getAllPost", getPosts)
router.get("/getPosts", checkAuth, getUserPosts)

module.exports = router


ksksk