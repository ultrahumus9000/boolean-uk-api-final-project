const getModifiedUserInfo = require("./service");

async function validateUser(req, res) {
  console.log("line 4", req.body);
  try {
    const result = await getModifiedUserInfo(req.body);
    res.json({ id: result.id, username: result.username });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
}

module.exports = { validateUser };
