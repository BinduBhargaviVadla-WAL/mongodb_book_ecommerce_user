const Hobby = require("../models/hobby");
function getHobby(req, res) {
  Hobby.find((err, hobbies_list) => {
    if (err) {
      res.json(err);
    } else {
      res.json(hobbies_list);
    }
  });
}
function createHobby(req, res) {
  console.log(req.body);
  let { hobby_name, description, doc } = req.body;
  let hobbyObject = new Hobby({
    hobby_name,
    description,
    doc,
  });
  console.log(hobbyObject);
  hobbyObject.save((error) => {
    if (error) {
      res.json(error);
    } else {
      res.json("Added Hobby details successfully");
    }
  });
}
function deleteHobby(req, res) {
  Hobby.findByIdAndDelete(req.params._id, function (err) {
    if (err) {
      res.json(err);
    } else {
      res.json(`Hobby with _id as ${req.params._id} is removed`);
    }
  });
}
module.exports = { getHobby, createHobby, deleteHobby };
