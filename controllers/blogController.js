const BlogModal = require('../models/blogModel')

class BlogController {

  createBlog(req, res){
    const blogData = req.body;
    const blogModal = new BlogModal();
    blogModal.createBlog(blogData, (err, result)=>{
      if(err){
        console.error('Error Creating Blog:', err);
        res.status(500).send('Internal Server Error');
      }
      else{
        const blogId = result.insertId;
        blogModal.getSingleBlogById(blogId, (err, result) => {
          if (err) {
            console.error('Error Getting Blog for this id', err);
            res.status(500).send('Internal Server Error');
          } else {
            res.json({ status: 'success', message: 'Executed Successfully', data: result.length > 0 ? result[0] : null });
          }
        });
      }
    })
  }

  updateBlogById(req, res){
    const blogId = req.params.blogId;
    const blogData = req.body;
    const blogModal = new BlogModal();
    blogModal.updateBlogById(blogId, blogData, (err, result)=>{
      if(err){
        console.error('Error Updating Blog:', err);
        res.status(500).send('Internal Server Error');
      }
      else{
        blogModal.getSingleBlogById(blogId, (err, result) => {
          if (err) {
            console.error('Error Getting Blog for this id', err);
            res.status(500).send('Internal Server Error');
          } else {
            res.json({ status: 'success', message: 'Executed Successfully', data: result.length > 0 ? result[0] : null });
          }
        })
      }
    })
  }

  getAllBlogs(req, res){
    const blogModal = new BlogModal();
    blogModal.getAllBlogs((err, result)=>{
      if(err){
        console.error('Error getting Blogs:', err);
        res.status(500).send('Internal Server Error');
      }
      else{
        res.json({status: 'success', message: 'Executed Successfully', data: result})
      }
    })
  }

  getSingleBlogById(req, res){
    const blogId = req.params.blogId;
    const blogModal = new BlogModal();
    blogModal.getSingleBlogById(blogId, (err, result)=>{
      if (err) {
        console.error('Error getting Blog by ID:', err);
        res.status(500).send('Internal Server Error');
      } else {
        res.json({status: 'success', message: 'Executed Successfully', data: result.length > 0 ? result[0] : null})
      }
    })
  }

  deleteBlogById(req, res){
    const blogId = req.params.blogId;
    const blogModal = new BlogModal();
    blogModal.deleteBlogById(blogId, (err, result)=>{
      if(err){
        console.error('Error Deleting Blog with this ID', err);
        res.status(500).send('Internal Server Error')
      }
      res.json({ status: 'success', message: 'Executed Successfully' });
    })
  }

}

module.exports = BlogController