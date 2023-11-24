const express = require("express");
const photos = require("../handlers/photos/");
const router = express.Router();

router.post("/filter",photos.handleFilter);

router.post("/allFilter",photos.handleAllFilter);

router.post('/writeFile', photos.writeIntoFile);

router.get("/oauth/callback",photos.handleSetOauth);

router.get("/signout",photos.signoutHandler);

module.exports = router;