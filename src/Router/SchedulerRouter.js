const express = require("express"); 

const router = express.Router();

const { getAnimeSchedule, postAnimeSchedule, FindDetail } = require("../Controller/CallScheduler");
 



router.route("/").get(getAnimeSchedule);
router.route("/").post(postAnimeSchedule);
router.route("/getData/:value").get(FindDetail);
 

module.exports = router; 