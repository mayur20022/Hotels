const jwt = require('jsonwebtoken')

const jwtMiddleWare = (req, res, next) => {
    const authorization = req.headers.authorization;
    
    if (!authorization) {
        return res.status(401).send('token not found')
    }
    
    const token = req.headers.authorization.split(" ")[1];

    if (!token) return res.status(401).json({ message: "Unauthorized" })
        
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
        
    } catch (err) {
        return res.status(401).json({ message: "Invalid Token" })
    }
}


const generateToken = (userData) => {
    return jwt.sign({userData}, process.env.JWT_SECRET,{expiresIn:30000})
}


module.exports = { jwtMiddleWare, generateToken };