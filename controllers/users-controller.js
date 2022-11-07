const { Users } = require("../models");

const usersController = {
  getUsers(req, res) {
    Users.find({})
      .populate({
        path: "thoughts",
        select: "-__v",
      })
      .select("-__v")
      .sort({ _id: -1 })
      .then((usersData) => res.json(usersData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  getUserId({ params }, res) {
    Users.findOne({ _id: params.id })
      .populate({
        path: "thoughts",
        select: "-__v",
      })
      .select("-__v")
      .then((usersData) => {
        if (!usersData) {
          res.status(404).json({ message: "User does not exist!" });
          return;
        }
        res.json(usersData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  createUser({ body }, res) {
    Users.create(body)
      .then((usersData) => res.json(usersData))
      .catch((err) => res.json(err));
  },

  updateUser({ params, body }, res) {
    Users.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((usersData) => {
        if (!usersData) {
          res.status(404).json({ message: "User does not exist!" });
          return;
        }
        res.json(usersData);
      })
      .catch((err) => res.status(400).json(err));
  },

  deleteUser({ params }, res) {
    Users.findOneAndDelete({ _id: params.id })
      .then((usersData) => {
        if (!usersData) {
          res.status(404).json({ message: "User does not exist!" });
          return;
        }
        res.json(usersData);
      })
      .catch((err) => res.status(400).json(err));
  },

  addFriend({ params }, res) {
    Users.findOneAndUpdate(
      { _id: params.id },
      { $addToSet: { friends: params.friendsId } },
      { new: true }
    )
      .then((usersData) => {
        if (!usersData) {
          res.status(404).json({ message: "User does not exist!" });
          return;
        }
        res.json(usersData);
      })
      .catch((err) => res.json(err));
  },

  deleteFriend({ params }, res) {
    Users.findOneAndUpdate(
      { _id: params.id },
      { $pull: { friends: params.friendsId } },
      { new: true }
    )
      .then((usersData) => {
        if (!usersData) {
          res.status(404).json({ message: "User does not exist!" });
          return;
        }
        res.json(usersData);
      })
      .catch((err) => res.json(err));
  },
};

module.exports = usersController;
