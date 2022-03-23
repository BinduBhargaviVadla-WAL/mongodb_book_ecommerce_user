var express = require("express");
var router = express.Router();
const hobbyController = require("../controller/hobby");
router.get("/", hobbyController.getHobby);
router.post("/", hobbyController.createHobby);
router.delete("/:_id", hobbyController.deleteHobby);
module.exports = router;
