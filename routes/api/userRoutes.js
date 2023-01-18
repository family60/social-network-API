const router = require("express").Router();

const {getUsers, getUser, createUser, updateUser, deleteUser, addFriend, removeFriend} = require("../../controllers/userController");

//Endpoint: "/api/users"
router.route("/").get(getUsers).post(createUser);

//Endpoint: "/api/users/:userId"
router.route("/:userId").get(getUser).put(updateUser).delete(deleteUser);

//Endpoint: "/api/users/:userId/friends/:friendId"
router.route("/:userId/friends/:friendId").post(addFriend).delete(removeFriend);

module.exports = router;