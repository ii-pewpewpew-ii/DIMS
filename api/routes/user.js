const express = require("express");
const photos = require("../handlers/photos");
const router = express.Router();

router.post("/filter",photos.handleFilter);

router.post("/oauth/callback",photos.handleSetOauth);

module.exports = router;