const router = require('express').Router();
const {
  getAllThoughts,
  getOneThought,
  postThought,
  putThought,
  deleteThought
} = require('../../controllers/commentController');


router.route('/').get(getAllThoughts).post(postThought);

router.route('/:id').get(getOneThought).put(putThought).delete(deleteThought);


module.exports = router;