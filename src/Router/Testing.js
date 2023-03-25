const express = require("express");

const router = express.Router();

const { getTestingApi, postTestingApi } = require("../Controller/TestingControl");

router.route("/").get(getTestingApi);
router.route("/").post(postTestingApi);

module.exports = router; 