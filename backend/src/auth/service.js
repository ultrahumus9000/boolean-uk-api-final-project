const db = require("../../database");
const { compare } = require("bcrypt");

async function getModifiedUserInfo(user) {
  const { username, password } = user;

  const result = await db.user.findUnique({
    where: username,
  });

  if (!result) {
    throw new Error("username doesnt exist ");
  }
  const secondCheck = await compare(password, user.password);
  if (secondCheck) {
    return result;
  } else {
    throw new Error("Password incorrect");
  }
}

module.exports = getModifiedUserInfo;
