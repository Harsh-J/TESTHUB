const jwt = require("jsonwebtoken");

function getToken(user) {
  console.log(user);

  const token = jwt.sign({ user }, process.env.JWT_SECRET, {
    expiresIn: 86400,
  });
  return token;
}

function verifyToken(req, res, next) {
  let token;
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Bearer"
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    const user_verified = jwt.verify(token, process.env.JWT_SECRET);
    if (user_verified) {
      req.user = user_verified.user;
    } else {
      throw new Error("Token not verified");
    }
    next();
  } catch (err) {
    res.send(err);
  }
}

module.exports = {
  getToken,
  verifyToken,
};
