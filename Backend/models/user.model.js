const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema(
  {
    fullName: String,
    userName: String,
    email: {
      type: String,
      unique: true,
    },
    password: String,
    profileImage: {
      type: String,
      default:
        "https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg",
    },
    designation:{
      type:String
    },
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
  },
  { timestamps: true }
)

userSchema.pre("save", async function (next) {
  // console.log("I am pre middleware..")
  if (!this.isModified("password")) return next()
  try {
    const salt = await bcrypt.genSalt(10)
    const generatedPass = await bcrypt.hash(this.password, salt)
    this.password = generatedPass
    next()
  } catch (error) {
    return next(error)
  }
})
const User = mongoose.model("User", userSchema)

module.exports = User
