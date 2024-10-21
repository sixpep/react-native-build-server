var express = require("express");
var router = express.Router();
var { sendNotification } = require("../src/firebase/firebase.helpers");

router.post("/send-notification", sendNotification);

module.exports = router;
