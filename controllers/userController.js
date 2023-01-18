const {User, Thought} = require("../models");

const userController = {
    //Get all users (GET)
    getUsers(req, res) {
      User.find().select("-__v").then((userData) => {
          res.json(userData);
        }).catch((err) => {//default err msg
          console.log(err);
          res.status(500).json(err);
        });
    },
  
    //Get single user by id (GET)
    getSingleUser(req, res) {
      User.findOne({ _id: req.params.userId }).select("-__v").populate("friends").populate("thoughts").then((userData) => {
          if (!userData) {
            return res.status(404).json({ message: "There is no user with this id" });
          }
          res.json(userData);
        }).catch((err) => {//default err msg
          console.log(err);
          res.status(500).json(err);
        });
    },
  
    //Create a new user (POST)
    createUser(req, res) {
      User.create(req.body).then((userData) => {
          res.json(userData);
        }).catch((err) => {//defaut err msg
          console.log(err);
          res.status(500).json(err);
        });
    },
  
    //Update a user (PUT)
    updateUser(req, res) {
      User.findOneAndUpdate(
        { _id: req.params.userId },
        {
          $set: req.body,
        },
        {
          runValidators: true,
          new: true,
        }).then((userData) => {
          if (!userData) {
            return res.status(404).json({ message: "There is no user with this id" });
          }
          res.json(userData);
        }).catch((err) => {//defaut err msg
          console.log(err);
          res.status(500).json(err);
        });
    },
  
    // Delete user ((BONUS) and delete their associated thoughts) (DELETE)
    deleteUser(req, res) {
      User.findOneAndDelete({ _id: req.params.userId })
        .then((userData) => {
          if (!userData) {
            return res.status(404).json({ message: "Theree is no user with this id" });
          }
          //(BONUS) Getting ID's of the user's "thoughts" and deleting them all
          return Thought.deleteMany({ _id: { $in: userData.thoughts } });
        }).then(() => {
          res.json({ message: "User and their associated thoughts have been deleted" });
        }).catch((err) => {//defaut err msg
          console.log(err);
          res.status(500).json(err);
        });
    },
  
    //Add friend to friend list (POST)
    addFriend(req, res) {
      User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { new: true }
      ).then((userData) => {
          if (!userData) {
            return res.status(404).json({ message: "There is no user with this id" });
          }
          res.json(userData);
        }).catch((err) => {//default err msg
          console.log(err);
          res.status(500).json(err);
        });
    },
  
    //Remove friend from friend list (DELETE)
    removeFriend(req, res) {
      User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { new: true }
      ).then((userData) => {
          if (!userData) {
            return res.status(404).json({ message: "There is no user with this id" });
          }
          res.json(userData);
        }).catch((err) => {//default err msg
          console.log(err);
          res.status(500).json(err);
        });
    },
  };
  
  
  module.exports = userController;