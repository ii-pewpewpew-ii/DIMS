const express = require("express");
const router = express.Router()
const auth = require("../handlers/auth");


router.post('/user',auth.login);

router.post('/signup',auth.signup);

module.exports = router;