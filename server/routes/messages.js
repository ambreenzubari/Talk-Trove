const { addMessage } = require("../controllers/messages");
const { getAllMessage } = require("../controllers/messages");

const auth = require("../middleware/auth");
const router = require("express").Router();

router.post("/addmsg", auth, addMessage);
router.post("/getmsg/", auth, getAllMessage);

module.exports = router;