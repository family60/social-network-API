const { Thought, User } = require("../models");

const thoughtController = {
  //Get all thoughts (GET)
  getThoughts(req, res) {
    Thought.find().sort({ createdAt: -1 }).then((thoughtData) => {
        res.json(thoughtData);
      }).catch((err) => {//default err msg
        console.log(err);
        res.status(500).json(err);
      });
  },

  //Get single thought by id (GET)
  getThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId }).then((thoughtData) => {
        if (!thoughtData) {
          return res.status(404).json({ message: "There is no thought with this id" });
        }
        res.json(thoughtData);
      }).catch((err) => {//default err msg
        console.log(err);
        res.status(500).json(err);
      });
  },

  //Create a thought (POST)
  createThought(req, res) {
    Thought.create(req.body).then((thoughtData) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: thoughtData._id } },
          { new: true }
        );
      }).then((userData) => {
        if (!userData) {
          return res
            .status(404)
            .json({ message: "A thought was created but no user with this id was found" });
        }
        res.json({ message: "A thought was created sucessfully" });
      }).catch((err) => {//default err msg
        console.log(err);
        res.status(500).json(err);
      });
  },

  //Update a thought (PUT)
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    ).then((thoughtData) => {
        if (!thoughtData) {
          return res.status(404).json({ message: "There is no thought with this id" });
        }
        res.json(thoughtData);
      }).catch((err) => {//default err msg
        console.log(err);
        res.status(500).json(err);
      });
  },

  //Delete thought (DELETE)
  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
      .then((thoughtData) => {
        if (!thoughtData) {
          return res.status(404).json({ message: "There is no thought with this id" });
        }
        //Removing the thought id from user's "thoughts"
        return User.findOneAndUpdate(
          { thoughts: req.params.thoughtId },
          { $pull: { thoughts: req.params.thoughtId } },
          { new: true }
        );
      }).then((userData) => {
        if (!userData) {
          return res.status(404).json({ message: "A thought was created but there is no user with this id" });
        }
        res.json({ message: "The thought was sucessfully deleted" });
      }).catch((err) => {//default err msg
        console.log(err);
        res.status(500).json(err);
      });
  },

  //Add a reaction to a thought (POST)
  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    ).then((thoughtData) => {
        if (!thoughtData) {
          return res.status(404).json({ message: "There is no thought with this id" });
        }
        res.json(thoughtData);
      }).catch((err) => {//default err msg
        console.log(err);
        res.status(500).json(err);
      });
  },

  //Remove reaction from a thought (DELETE)
  removeReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionID: req.params.reactionID } } },
      { runValidators: true, new: true }
    ).then((thoughtData) => {
        if (!thoughtData) {
          return res.status(404).json({ message: "There is no thought with this id" });
        }
        res.json(thoughtData);
      }).catch((err) => {//default err msg
        console.log(err);
        res.status(500).json(err);
      });
  },
};


module.exports = thoughtController;