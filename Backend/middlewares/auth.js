const jwt = require("jsonwebtoken")

const checkAuth = async (req,res,next)=>{
    const token = req.headers.authorization.split(" ")[1]
    if(!token){
        return res.json({
            msg:"Token missing."
        })
    }
    try {
        const decoded = await jwt.verify(token,process.env.SECRET_KEY)
        req.user = decoded
        next()
    } catch (error) {
        return next(error)
    }
}

module.exports = checkAuth