const { register, getById } = require("../controllers/users");
const { login } = require("../controllers/users");
const { setAvatar } = require("../controllers/users");
const { getAllUsers } = require("../controllers/users");
const router = require("express").Router();
const auth=require("../middleware/auth")
router.post("/register", register);
router.post("/login", login);
router.post("/setAvatar/:id", setAvatar);
router.get("/allUsers/:id",auth, getAllUsers);
router.get("/getUserById/:id",auth, getById);

module.exports = router;
