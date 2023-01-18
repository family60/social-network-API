const router = require("express").Router();

const {getThoughts, getThought, createThought, updateThought, deleteThought, addReaction, removeReaction} = require("../../controllers/thoughtController");

//Endpoint: "/api/thoughts"
router.route("/").get(getThoughts).post(createThought);

//Endpoint: "/api/thoughts/:thoughtId"
router.route("/:thoughtId").get(getThought).put(updateThought).delete(deleteThought);

//Endpoint: "/api/thoughts/:thoughtId/reactions/:reactionId"
router.route("/:thoughtId/reactions/:reactionId").post(addReaction).delete(removeReaction);

module.exports = router;