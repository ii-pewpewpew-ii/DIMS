const express = require("express");
const photos = require("../handlers/photos");
const router = express.Router();

router.get("/oauth/google",photos.handleSetOauth);
router.get("/oauth/googleTest",photos.handleOAuthSet);

module.exports = router;