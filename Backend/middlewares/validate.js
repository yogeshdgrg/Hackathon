const validate = (schema) => async (req, res, next) => {
    // console.log("Enter into the validate part...")
    try {
        const parseBody = await schema.parseAsync(req.body)
        req.body = parseBody
        console.log(req.body)
        next()
    }
    catch (err) {
        const errMsg = err.errors[0].message
        return res.json({ msg: errMsg })
    }
}

module.exports = validate