var mongoose = require("mongoose");
var HobbySchema = new mongoose.Schema({
  hobby_name: { type: String, required: true, maxLength: 100 },
  description: { type: String, required: true, maxLength: 500 },
  doc: { type: Date },
});
module.exports = mongoose.model("Hobby", HobbySchema);
