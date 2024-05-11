const { addMessage } = require("../controllers/messages");
const { getAllMessage } = require("../controllers/messages");

const router = require("express").Router();

router.post("/addmsg", addMessage);
router.post("/getmsg/", getAllMessage);

module.exports = router;
