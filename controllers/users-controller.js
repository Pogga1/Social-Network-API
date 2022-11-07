const { Users } = require('../models');

const usersController = {
    getUsers(req,res) {
        Users.find({})
        .populate({
            path: "thoughts",
            select: "-__v"
        })
        .select("-__v")
        .sort({_id: -1})
        .then((userData)=> res.json(userData))
        .catch((err) => {
            console.log(err);
            res.status(400).json(err)
        })
    }, 

}
module.exports = usersController