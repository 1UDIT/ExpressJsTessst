const express = require("express");

const router = express.Router();
const multer = require("multer"); 

const { PostimageUpload, GetimageUpload, FindDetail } = require("../Controller/CallUploderImage");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });


router.route("/").post(upload.single("testImage"),PostimageUpload);
router.route("/").get(GetimageUpload);
router.route("/getData/:value").get(FindDetail);


module.exports = router; 