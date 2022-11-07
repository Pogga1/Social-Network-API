const router = require('express').Router()
const { getUsers } = require('../../controllers/users-controller')

router
    .route("/users").get(getUsers);

// router
//     .route("/users/:id").get(getUserId);

// router
//     .route("/users/:id/friends/:friendsId");

module.exports = router