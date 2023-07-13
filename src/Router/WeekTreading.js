const express = require("express"); 

const router = express.Router();
const multer = require("multer"); 

const { getCallWeeklyTread, postCallWeeklyTread } = require("../Controller/CallWeeklyTreed");
 

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });


router.route("/").get(getCallWeeklyTread);
router.route("/").post(upload.single("testImage"),postCallWeeklyTread);
 

module.exports = router; 