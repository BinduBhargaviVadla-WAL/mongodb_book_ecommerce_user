var express = require("express");
var router = express.Router();
const forumController = require("../controller/forum");
router.get("/", forumController.getForum);
router.post("/", forumController.createForum);
router.delete("/:_id", forumController.deleteForum);
router.put("/:_id", forumController.editForum);
module.exports = router;
