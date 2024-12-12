const User = require("../models/user.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("following followers")
    if (!user) {
      return res.status(400).json({
        msg: "User doesnot exist",
      })
    }
    const followingCount = user.following.length
    const followersCount = user.followers.length
    return res.json({ user, followingCount, followersCount })
  } catch (error) {
    return res.status(500).json(error)
  }
}

// * Get all User

const userController = async (req, res) => {
  // console.log("Enter into User detail")
  try {
    const users = await User.find({})
    if (!users)
      return res.json({
        msg: "No User exists.",
      })
    return res.status(200).json(users)
  } catch (err) {
    return res.status(500).json(err)
  }
}

// * SignUp Controller

const signUpController = async (req, res) => {
  // console.log(req.body)
  try {
    let userData = await User.create(req.body)
    if (!userData)
      return res.json({
        msg: "User cannot be created...",
      })
    userData = await User.findById(userData._id).select("-password")
    return res.status(201).json(userData)
  } catch (err) {
    return res.status(500).json(err)
  }
}

// * Login Controller

const loginController = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res.json({ msg: "User doesnot exists..." })
    }
    const isPassCorrect = await bcrypt.compare(password, user.password)
    if (!isPassCorrect) {
      return res.json("Invalid email or password...")
    }

    const userDetails = await User.findOne({ _id: user._id }).select(
      "-password"
    )

    const payload = {
      id: user._id,
      userName: user.userName,
      email: user.email,
    }

    const token = await jwt.sign(payload, process.env.SECRET_KEY)
    return res.status(200).json({ userDetails, token })
  } catch (err) {
    return res.status(500).json(err)
  }
}

// * following the user

const followUser = async (req, res) => {
  try {
    const userToFollow = await User.findById(req.params.id)
    const currentUser = await User.findById(req.user.id)

    if (!userToFollow || !currentUser) {
      return res.status(404).json({ message: "User not found" })
    }

    if (currentUser.following.includes(userToFollow._id)) {
      return res
        .status(400)
        .json({ message: "You are already following this user" })
    }

    currentUser.following.push(userToFollow._id)
    userToFollow.followers.push(currentUser._id)

    await currentUser.save()
    await userToFollow.save()

    res.status(200).json({ message: "User followed successfully" })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}


// * Unfollowing the User


const unfollowUser = async (req, res) => {
  try {
    const userToUnfollow = await User.findById(req.params.id);
    const currentUser = await User.findById(req.user.id);

    if (!userToUnfollow || !currentUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!currentUser.following.includes(userToUnfollow._id)) {
      return res.status(400).json({ message: 'You are not following this user' });
    }

    currentUser.following.pull(userToUnfollow._id);
    userToUnfollow.followers.pull(currentUser._id);

    await currentUser.save();
    await userToUnfollow.save();

    res.status(200).json({ message: 'User unfollowed successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}


// * User follower list

const followerList = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('followers', 'fullName userName profileImage');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user.followers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}


// * User followng list 

const followingList = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('following', 'fullName userName profileImage');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user.following);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}


module.exports = {
  signUpController,
  loginController,
  userController,
  followUser,
  unfollowUser,
  followerList,
  followingList,
  getUser
}
