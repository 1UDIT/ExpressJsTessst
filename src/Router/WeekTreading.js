const express = require("express"); 

const router = express.Router();

const { getCallWeeklyTread, postCallWeeklyTread } = require("../Controller/CallWeeklyTreed");
 



router.route("/").get(getCallWeeklyTread);
router.route("/").post(postCallWeeklyTread);
 

module.exports = router; 