const { z } = require("zod")

const signupSchema = z.object({
  fullName: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(3, { message: "Name must be atleast 3 char..." }),
  userName: z.string({ required_error: "UserNameis required..." }).trim(),
  email: z
    .string({ required_error: "Email is required..." })
    .trim()
    .email({ message: "Email is not valid..." }),
  password: z
    .string({ required_error: "Password is required..." })
    .min(6, { message: "Password must be atleast 6 characters." }),
})

module.exports = signupSchema