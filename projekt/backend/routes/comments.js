const express = require('express');
const router = express.Router();

const Comment = require('../models/Comment');

router.get('/', async (req, res) => {
    Comment.find()
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
    let newComment = new Comment({
        creationDate: new Date(),
        ...req.body
      })
      await newComment.save()
      return res.send(newComment)
});

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const updateComment = await Comment.findByIdAndUpdate(
    {_id: id},
    { ...req.body},
    {new: true}
  )
  return res.send(updateComment)
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id
    try{
      Comment.findByIdAndDelete(id, function(error, response){
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