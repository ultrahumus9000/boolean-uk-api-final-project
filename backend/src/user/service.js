const db = require("../../database");
const { hash } = require("bcrypt");

async function create(newUser) {
  const plainText = newUser.password;
  const hashedPassword = await hash(plainText, 10);
  const savedUser = await db.user.create({
    data: {
      ...newUser,
      password: hashedPassword,
    },
  });
  return savedUser;
}

const modifiedUser = {
  ...db.user,
  create,
};
module.exports = modifiedUser;
