const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

exports.validateToken = asyncHandler(async (req, res, next) => {
  //console.log(process.env.ACCESS_TOKEN);
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    //console.log(token);
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
      if (err) {
        res.status(401);
        throw new Error("User is not authorized");
      }
      req.user = decoded.user;
      next();
    });
    if (!token) {
      res.status(401);
      throw new Error("User is not authorized or token is missing");
    }
  }
});
