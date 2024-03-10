const router = require('express').Router();
const {
  getAllUsers,
  getOneUser,
  postUser,
  putUser,
  deleteUser,
} = require('../../controllers/userController');


router.route('/').get(getAllUsers).post(postUser);

router.route('/:id').get(getOneUser).put(putUser).delete(deleteUser);


module.exports = router;