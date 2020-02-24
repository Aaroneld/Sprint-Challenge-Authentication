const router = require('express').Router();
const authDB = require('./auth-model');
const JWT = require('./authenticate-middleware');
const bcrypt = require('bcrypt');





router.post('/register', (req, res) => {
  // implement registration
  const user = req.body;

  const hash = bcrypt.hashSync(user.password, 12);

  user.password = hash;

  authDB.register(user)
    .then(user => {
      res.status(201)
      .json({message: user});
    })
    .catch( err => {
      res.status(500)
      .json({error: err.message})
    });

});

router.post('/login', (req, res) => {

  const {username, password} = req.body;

  authDB.login(username)
      .first()
      .then(user => {
          if (user && bcrypt.compareSync(password, user.password)){
              const token = JWT.generateToken(user);

              res.status(200)
                  .json({message: `Welcome ${user.username}`, token})
          } else {
              res.status(401)
                  .json({message: 'Invalid Credentials',});
          }
      })
      .catch(err => {
          res.status(500)
              .json({error: err.message, err})
      })

  // implement login
});

module.exports = router;
