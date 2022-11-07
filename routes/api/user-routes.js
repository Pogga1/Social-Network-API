const router = require('express').Router()
const { getUsers, getUserId, createUser, updateUser, deleteUser, addFriend, deleteFriend } = require('../../controllers/users-controller')

router
    .route("/users").get(getUsers).post(createUser);

router
    .route("/users/:id").get(getUserId).put(updateUser).delete(deleteUser);

router
    .route("/users/:id/friends/:friendsId").post(addFriend).delete(deleteFriend);

module.exports = router