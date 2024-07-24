
const admin = require('firebase-admin');
const multer = require('multer');
const path = require('path');
var serviceAccount = require("../service_key.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: 'talk-trove-aa698.appspot.com'
  });
const bucket = admin.storage().bucket();

module.exports.upload = (async (req, res) => {
    try {
        if (!req.file) {
          return res.status(400).send('No file uploaded.');
        }
    
        const blob = bucket.file(Date.now() + path.extname(req.file.originalname));
        const blobStream = blob.createWriteStream({
          metadata: {
            contentType: req.file.mimetype,
          },
        });
    
        blobStream.on('error', (err) => {
          console.error(err);
          res.status(500).send('Failed to upload image.');
        });
    
        blobStream.on('finish', async () => {
          await blob.makePublic();
          const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
          res.status(200).send({ fileUrl: publicUrl });
        });
    
        blobStream.end(req.file.buffer);
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error.');
      }
});
