const express = require("express")
const checkAuth = require("../middlewares/auth")
const {
  signUpController,
  loginController,
  userController,
  followUser,
  unfollowUser,
  followerList,
  followingList,
  getUser
} = require("../controllers/user.controller")
const validate = require("../middlewares/validate")
const signupSchema = require("../middlewares/validation")

const router = express.Router()



router.get("/getUser",checkAuth,getUser)

router.post("/signUp",validate(signupSchema), signUpController)
router.post("/login", loginController)
router.get("/getAllUser", userController) //* gets all the user

router.get('/follow/:id',checkAuth,followUser);

router.get('/unfollow/:id',checkAuth, unfollowUser);

router.get('/followers',checkAuth, followerList);

router.get('/following',checkAuth, followingList);


module.exports = router
