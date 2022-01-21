const express = require('express');
const router = express.Router();

const User = require('../models/User');

router.get('/', async (req, res) => {
  User.find()
  .exec(function(error, usersX){
    if(error){
      return res.send(error)
    }
    return res.send({
      users: [...usersX]
    })
  })
});

router.post('/', async (req, res) => {
  let newUser = new User({
    registrationDate: new Date(),
    ...req.body
  })
  newUser.save()
  console.log(newUser._id);
  res.send(newUser)
});

router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const updateUser = await User.findByIdAndUpdate(
    {_id: id},
    { ...req.body},
    {new: true}
  )
  return res.send(updateUser)
    
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id
  try{
    User.findByIdAndDelete(id, function(error, response){
      if(error){
        return res.send(error)
      }
      return res.send(id)
    })
  }catch(error){
    return res.send(error)
  }
});



module.exports = router;
