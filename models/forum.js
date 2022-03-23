const mongoose = require("mongoose");
const forumSchema = new mongoose.Schema({
  title: { type: String, required: true, maxlength: 100 },
  doc: { type: Date },
  forumbody: { type: String, required: true, maxlength: 500 },
  author: { type: String, required: true, maxlength: 50 },
});
module.exports = mongoose.model("Forum", forumSchema);
