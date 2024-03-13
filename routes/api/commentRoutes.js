const router = require('express').Router();
const {
  getAllThoughts,
  getOneThought,
  postThought,
  putThought,
  deleteThought,
  postReaction,
  removeReaction,
} = require('../../controllers/commentController');


router.route('/').get(getAllThoughts).post(postThought);

router.route('/:id').get(getOneThought).put(putThought).delete(deleteThought);

router.route('/:id/reactions').post(postReaction)

router.route('/:id/reactions/:id').delete(removeReaction)

module.exports = router;