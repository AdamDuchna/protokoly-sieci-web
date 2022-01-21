const express = require('express');
const router = express.Router();

const Likes = require('../models/Likes');

router.get('/', async (req, res) => {
    Likes.find()
    .exec(function(error, commentsX){
    if(error){
      return res.send(error)
    }
    return res.send({
      comments: [...commentsX]
    })
  })
});

router.post('/', async (req, res) => {
    let newLikes = new Likes({
        creationDate: new Date(),
        ...req.body
      })
      await newLikes.save()
      return res.send(newLikes)
});

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const updateLikes = await Likes.findByIdAndUpdate(
    {_id: id},
    { ...req.body},
    {new: true}
  )
  return res.send(updateLikes)
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id
    try{
      Likes.findByIdAndDelete(id, function(error, response){
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