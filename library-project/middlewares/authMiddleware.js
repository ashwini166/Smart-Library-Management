const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req,res,next)=>{
console.log(
"AUTH HEADER:",
req.headers.authorization
);
try{

console.log("AUTH HEADER:",req.headers.authorization);

let token;

if(
req.headers.authorization &&
req.headers.authorization.startsWith("Bearer")
){

token = req.headers.authorization.split(" ")[1];

console.log("TOKEN:", token);

const decoded = jwt.verify(
  token,
  process.env.JWT_SECRET
);

console.log("DECODED TOKEN:", decoded);

const user = await User.findById(decoded.id)
.select("-password");

console.log("USER:",user);

req.user = user;

next();

}else{

return res.status(401).json({
message:"No token provided"
});

}

}catch(error){

console.log("AUTH ERROR:",error);

res.status(401).json({
message:"Invalid token"
});

}

};

module.exports = protect;