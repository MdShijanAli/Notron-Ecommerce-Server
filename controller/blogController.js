const BlogModal = require('../model/blogModel')

class BlogController {
  getAllBlogs(req, res){
    const blogModal = new BlogModal();
    blogModal.getAllBlogs((err, result)=>{
      if(err){
        console.error('Error getting Blogs:', err);
        res.status(500).send('Internal Server Error');
      }
      else{
        res.json(result)
      }
    })
  }
}

module.exports = BlogController