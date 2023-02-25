const db = require('mongoose');
const model = require('./models/userModel');
const bcrypt = require('bcrypt');


const controller = {

  signIn: async (req, res, next) => {
    const { username, password } = req.body;
    
    try {
      const newUser = await model.findOne({username: username});
      const success = await bcrypt.compare(password, newUser.password)
      if(success) {
        res.locals.user = success;
        return next();
      } else {
        return next({
        log: 'controller.signIn handler caught unknown error',
        message: { error: 'Invalid inputs' }
      })
      }
      
    }
    catch(err){
      return next({
        log: 'controller.signIn handler caught unknown error',
        message: { error: err }
      })
    }
  },

  register: async (req, res, next) => {
    const { username, password } = req.body;
    /* Alternative to Mike's way
    const salt = await bcrypt.genSalt(10); 10 IS ARBITRARY
    const hashedPassword = await bcrypt.hash(password, salt) 
    YOU WOULD NEED TO CHANGE PASSWORD WHEN USING MODEL.CREATE TO OUR NEW HASHEDPASSWORD
    */
    try {
      const newUser = await model.create({username, password});
      res.locals.userInfo = newUser;
      return next();
    }
    catch(err){
      return next({
        log: 'controller.register handler caught unknown error',
        message: { error: err }
      })
    }

  }
}


module.exports = controller;