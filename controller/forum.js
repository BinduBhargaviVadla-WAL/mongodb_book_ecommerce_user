const { body, validationResult } = require("express-validator");
const Forum = require("../models/forum");
function getForum(req, res) {
  //march22 get data from db
  Forum.find((err, forum_list) => {
    if (err) {
      res.json(err);
    } else {
      res.json(forum_list);
    }
  });
}
const createForum = [
  body("title")
    .trim()
    .isLength({ min: 10, max: 100 })
    .withMessage("Title in range of 10 to 100 charcters"),
  body("doc").trim().isDate().withMessage("Must be a valid date"),
  body("forumbody")
    .trim()
    .isLength({ min: 50, max: 500 })
    .withMessage("Forum Body in range of 50 to 500 charcters"),
  body("author")
    .trim()
    .isLength({ min: 5, max: 50 })
    .withMessage("Forum Body in range of 50 to 500 charcters")
    .isAlphanumeric()
    .withMessage(
      "Only alphabets and numbers allowed. No special characters allowed"
    ),
  (req, res) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      res.json({ status: 0, debug_data: errors });
    } else {
      console.log(req.body);
      let { title, doc, forumbody, author } = req.body;
      let forumObject = new Forum({ title, doc, forumbody, author });
      forumObject.save((error) => {
        if (error) {
          res.json(error);
        } else {
          res.json("Added forum successfully");
        }
      });
    }
  },
];
const editForum = [
  body("title")
    .trim()
    .isLength({ min: 10, max: 100 })
    .withMessage("Title in range of 10 to 100 charcters"),
  body("doc").trim().isDate().withMessage("Must be a valid date"),
  body("forumbody")
    .trim()
    .isLength({ min: 50, max: 500 })
    .withMessage("Forum Body in range of 50 to 500 charcters"),
  body("author")
    .trim()
    .isLength({ min: 5, max: 50 })
    .withMessage("Forum Body in range of 50 to 500 charcters")
    .isAlphanumeric()
    .withMessage(
      "Only alphabets and numbers allowed. No special characters allowed"
    ),
  (req, res) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      res.json({ status: 0, debug_data: errors });
    } else {
      let newData = { $set: req.body };
      console.log(newData);
      Forum.findByIdAndUpdate(req.params._id, newData, function (err) {
        if (err) {
          res.json(err);
        } else {
          res.json(`Forum with id ${req.params._id} updated successfully`);
        }
      });
    }
  },
];
// function editForum(req, res) {
//   let newData = { $set: req.body };
//   console.log(newData);
//   Forum.findByIdAndUpdate(req.params._id, newData, function (err) {
//     if (err) {
//       res.json(err);
//     } else {
//       res.json(`Forum with id ${req.params._id} updated successfully`);
//     }
//   });
// }
function deleteForum(req, res) {
  Forum.findByIdAndDelete(req.params._id, function (err) {
    if (err) {
      res.json(err);
    } else {
      res.json(`Forum with _id as ${req.params._id} is removed`);
    }
  });
}
module.exports = { getForum, createForum, deleteForum, editForum };
