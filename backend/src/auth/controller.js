const getModifiedUserInfo = require("./service");
const { createToken } = require("../../authgenerator");

async function validateUser(req, res) {
  try {
    const result = await getModifiedUserInfo(req.body);
    const token = createToken({
      id: result.id,
      username: result.username,
    });

    res.cookie("token", token, { httpOnly: true });

    res.json({
      id: result.id,
      username: result.username,
      first_name: result.first_name,
      last_name: result.last_name,
      email: result.email,
      avatar: result.avatar,
    });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
}

async function logoutUser(req, res) {
  res.clearCookie("token");
  //   console.log("line 30", req.cookies);
  res.json("you have log out");
}

module.exports = { validateUser, logoutUser };
