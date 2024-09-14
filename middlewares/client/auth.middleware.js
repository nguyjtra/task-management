const User = require("../../models/user.model");

module.exports.requireAuth = async (req, res, next) => {
  const authorization = req.headers.authorization;
  if(!authorization) {
    res.json({
      code: 400,
      message: "token need ."
    });
    return;
  }

  const token = authorization.split(" ")[1];
  if(!token) {
    res.json({
      code: 400,
      message: "token need ."
    });
    return;
  }

  const user = await User.findOne({
    token: token,
    deleted: false
  });

  if(!user) {
    res.json({
      code: 403,
      message: "invade Token ."
    });
    return;
  }

  req.tokenVerify = token;
  req.user=user
  next();
}