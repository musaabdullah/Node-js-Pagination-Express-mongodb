const { Router } = require('express');
const router = Router();
const Post = require('../model/posts');

 
router.get('/posts', async (req, res) => {
  try {
      const  { page, limit }  =  req.query ;


      const posts = await Post.find({}).limit(limit * 1).skip((page - 1) * limit).exec();
      const count = await Post.countDocuments();
    //   res.json({
    //       totalPages: Math.ceil(count / limit),
    //       currentPage: parseInt(page),
    //       post,
    //     })
    res.render('index', {totalPages: Math.ceil(count / limit), currentPage: parseInt(page), posts})
  } catch(error) {
      res.json(error);
  }
})

// router.get('/index', (req, res) => {
//     res.render('index');
// })


module.exports = router;