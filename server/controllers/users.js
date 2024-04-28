const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");

module.exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const usernameCheck = await User.findOne({ username });
    if (usernameCheck) {
      return res.json({ msg: "Username already exists!", status: false });
    }
    const emailCheck = await User.findOne({ email });
    if (emailCheck) {
      return res.json({ msg: "Email already exists!", status: false });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      username,
      password: hashedPassword,
    });
    console.log("USER", user)
    const token = jwt.sign({ id: user._id }, config.get("jwtPrivateKey"));
    delete user.password;
    console.log("Tikem",token)

    return res.json({ status: true, user: user, token: token });
  } catch (err) {
    next({ status: false, msg: err.message });
  }
};
