const express = require("express"); 

const router = express.Router();

const multer = require("multer"); 
 

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });

const { getFiveData, postFiveData, FindDetail } = require("../Controller/CallScheduler");
 



router.route("/").get(getFiveData);
router.route("/").post(upload.single("testImage"),postFiveData);
router.route("/getData/:value").get(FindDetail);
 

module.exports = router; 