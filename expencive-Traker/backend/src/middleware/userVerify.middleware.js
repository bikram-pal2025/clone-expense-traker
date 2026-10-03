const jwt = require("jsonwebtoken");

const verifyUser = (req, res, next) => {
  try {
   
 const refreshToken = req.cookies.refreshToken;

 if(!refreshToken){
   return res.status(401).json({
        message: "refresh token not found",
      });
    }
 
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Access token not found",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    if (decoded.role !== "user") {
      return res.status(403).json({
        message: "Access denied. Users only",
      });
    }

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired access token",
    });
  }
};

module.exports = { verifyUser };