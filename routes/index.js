const router = require('express').Router();

const apiUsers = require('./api/user-routes');
const apiThoughts = require('./api/thought-routes');


router.use('/api', apiUsers);
router.use('/api', apiThoughts);


router.use((req, res) => {
  res.status(404).send('<h1>404 Error!</h1>');
});

module.exports = router;