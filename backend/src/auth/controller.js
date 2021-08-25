const getModifiedUserInfo = require("./service");

async function validateUser(req, res) {
  try {
    const result = await findUserInfo(req.body);
    res.json({ id: result.id, username: result.username });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
}

module.exports = { validateUser };
