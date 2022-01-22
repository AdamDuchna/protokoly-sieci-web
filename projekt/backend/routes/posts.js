const express = require('express');

const router = express.Router();

const Post = require('../models/Post');


router.get('/', async (req, res) => {
    Post.find()
    .exec(function(error, postsX){
    if(error){
      return res.send(error)
    }
    return res.send({posts:[...postsX]})
  })
});

router.post('/', async (req, res) => {
    let newPost = new Post({
        creationDate: new Date(),
        ...req.body
      })
      await newPost.save()
      return res.send(newPost)
});

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const updatePost = await Post.findByIdAndUpdate(
    {_id: id},
    { ...req.body},
    {new: true}
  )
  return res.send(updatePost)
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id
    try{
      Post.findByIdAndDelete(id, function(error, response){
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