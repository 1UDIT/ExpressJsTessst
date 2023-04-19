const express = require("express");
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const router = express.Router();

const { getAnimeSchedule, postAnimeSchedule } = require("../Controller/CallScheduler");
 



router.route("/").get(getAnimeSchedule);
router.route("/").post(postAnimeSchedule);
 

module.exports = router; 