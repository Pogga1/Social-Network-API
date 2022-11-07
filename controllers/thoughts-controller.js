const { Users, Thoughts } = require("../models");

const thoughtsController = {
  getAllThoughts(req, res) {
    Thoughts.find({})
      .populate({
        path: "reactions",
        select: "-__v", 
      })
      .select("-__v")
      .then((thoughtsData) => res.json(thoughtsData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  getThoughtById({ params }, res) {
    Thoughts.findOne({ _id: params.id })
      .then((thoughtsData) => {
        if (!thoughtsData) {
          res.status(404).json({ message: "This thought does not exist!" });
          return;
        }
        res.json(thoughtsData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  createThought({ body }, res) {
    Thoughts.create(body)
      .then((_id) => {  
        return Users.findOneAndUpdate(
          { _id: body.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then((usersData) => {
        if (!usersData) {
          res.status(404).json({ message: "This user does not exist!" });
          return;
        }
        res.json(usersData);
      })
      .catch((err) => res.json(err));
  },

  updateThought({ params, body }, res) {
    Thoughts.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
    })
      .then((thoughtsData) => {
        if (!thoughtsData) {
          res.status(404).json({ message: "This thought does not exist!" });
          return;
        }
        res.json(thoughtsData);
      })
      .catch((err) => res.status(400).json(err));
  },

  deleteThought({ params }, res) {
    Thoughts.findOneAndDelete({ _id: params.id })
      .then((thoughtsData) => {
        if (!thoughtsData) {
          res.status(404).json({ message: "This thought does not exist!" });
          return;
        }
        res.json(thoughtsData);
      })
      .catch((err) => res.status(400).json(err));
  },

  addReaction({ params, body }, res) {
    Thoughts.findOneAndUpdate(
      { _id: params.thoughtId },
      { $addToSet: { reactions: body } },
      { new: true }
    )
      .then((thoughtsData) => {
        if (!thoughtsData) {
          res.status(404).json({ message: "This thought does not exist!" });
          return;
        }
        res.json(thoughtsData);
      })
      .catch((err) => res.json(err));
  },

  deleteReaction({ params }, res) {
    Thoughts.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )
      .then((thoughtsData) => {
        res.json(thoughtsData);
      })
      .catch((err) => res.json(err));
  },
};

module.exports = thoughtsController;