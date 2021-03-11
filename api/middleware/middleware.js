const Users = require('../users/users-model');




function logger(req, res, next) {
  // DO YOUR MAGIC
  console.log(`method:${req.method}, url:${req.url},${Date.now}`)
  next()
}

async function validateUserId(req, res, next) {
  // DO YOUR MAGIC
    try{
    const user = await Users.getById(req.params.id)
    if( user ){
      req.user = user,
      next()
    } else {
      res.status(404).json({
        message:"User not found"
      })
    }
    }
    catch (err){
      res.status(500).json({message:err});
  }
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
  if(!req.body){
    res.status(400).json({
      message:"missing user data"
    })
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  if(!req.body){
    req.status(404).json({
      message:"missing post data"
    })
  } else {
    if( !req.body.text || !req.body.user_id ){
      res.status(404).json({
        message:"missing required information fields"
      })
    } else {
      next();
    }
  }
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validatePost,
  validateUser,
  validateUserId
}