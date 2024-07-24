const multer = require('multer');
// multer
const router = require("express").Router();
const {upload} = require("../controllers/upload")
const mutlterUpload =  multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 }, // limit file size to 5MB
  });
// ({ storage: multer.memoryStorage() });

router.post('/upload', mutlterUpload.single('file'), upload)

module.exports = router;