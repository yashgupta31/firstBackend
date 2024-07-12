const jwt= require("jsonwebtoken");
const dotenv= require("dotenv");
dotenv.config();

const auth=(req, res, next)=>{
    const token= req.headers.token.split(" ")[1]
    if(!token){
        return res.status(401).send("You are not authenticated");
    }
    try {
       let decoded= jwt.verify(token, process.env.JWT_SECRET)
       req.body.userId= decoded.id;
       req.body.userEmail= decoded.email;
       req.body.userName= decoded.name;
       next();
    } catch (error) {
        return res.status(401).send("You are not authenticated");
    }
}

module.exports= auth;
