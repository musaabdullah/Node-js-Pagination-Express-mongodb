const { Router } = require('express');
const router = Router();
const Post = require('../model/posts');

 
router.get('/posts', async (req, res) => {
  try {
      const  { page, limit }  =  req.query ;
    //   const limit = 7;

      const post = await Post.find({}).limit(limit * 1).skip((page - 1) * limit).exec();
      const count = await Post.countDocuments();
      res.json({
          totalPages: Math.ceil(count / limit),
          currentPage: page,
          post,
        })
  } catch(error) {
      res.json(error);
  }
})



module.exports = router;