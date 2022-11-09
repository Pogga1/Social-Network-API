const router = require('express').Router();
const { getAllThoughts, getThoughtById, createThought, updateThought, deleteThought, addReaction, deleteReaction } = require('../../controllers/thoughts-controller')

router.route('/thoughts').get(getAllThoughts).post(createThought);

router.route('/thoughts/:id').get(getThoughtById).put(updateThought).delete(deleteThought);

router.route('/thoughts/:thoughtId/reactions').post(addReaction)

router.route('/thoughts/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;