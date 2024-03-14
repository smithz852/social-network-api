const router = require('express').Router();
const {
  getAllUsers,
  getOneUser,
  postUser,
  putUser,
  deleteUser,
  postFriend,
  removeFriend,
} = require('../../controllers/userController');


router.route('/').get(getAllUsers).post(postUser);

router.route('/:id').get(getOneUser).put(putUser).delete(deleteUser);

router.route('/:id/friends/').post(postFriend)

router.route('/:id/friends/:friendId').delete(removeFriend)


module.exports = router;