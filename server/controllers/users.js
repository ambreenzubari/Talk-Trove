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
    const token = jwt.sign({ id: user._id }, config.get("jwtPrivateKey"));
    delete user.password;
    return res.json({ status: true, user: user, token: token });
  } catch (err) {
    next({ status: false, msg: err.message });
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ msg: "Invalid email or or password", status: false });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.json({ msg: "Invalid email or or password", status: false });
    }

    const token = jwt.sign({ id: user._id }, config.get("jwtPrivateKey"));
    delete user.password;
    return res.json({ status: true, user: user, token: token });
  } catch (err) {
    next({ status: false, msg: err.message });
  }
};
module.exports.setAvatar = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.avatarImage;
    console.log("AVATAR", avatarImage);

    // Use await to wait for the update operation to complete and return the updated document
    const userData = await User.findByIdAndUpdate(
      userId,
      {
        isAvatarImageSet: avatarImage !== '', // Only set true if the avatarImage is not empty
        avatarImage: avatarImage || null, // Set to null if the avatarImage is empty
      },
      { new: true } // This option ensures that the updated document is returned
    );

    console.log("USER AVATAR IMAGE", userData.avatarImage);
    return res.json({
      isSet: userData.isAvatarImageSet,
      image: userData.avatarImage,
      status: true,
    });
  } catch (err) {
    next({ status: false, msg: err.message });
  }
};

module.exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({ _id: { $ne: req.params.id } }).select([
      "email",
      "username",
      "avatarImage",
      "_id",
    ]);
    return res.json({ status: true, users });
  } catch (err) {
    next({ status: false, msg: err.message });
  }
};

module.exports.getById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select([
      "email",
      "username",
      "avatarImage",
      "_id",
    ]);

    if (!user) {
      return res.status(404).json({ status: false, msg: "User not found" });
    }

    return res.json({ status: 200, user });
  } catch (err) {
    return res.status(500).json({ status: false, msg: err.message });
  }
};
