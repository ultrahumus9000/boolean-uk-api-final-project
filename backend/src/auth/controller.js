const getModifiedUserInfo = require("./service");

async function validateUser(req, res) {
  console.log("line 4", req.body);
  try {
    const result = await getModifiedUserInfo(req.body);
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

module.exports = { validateUser };
