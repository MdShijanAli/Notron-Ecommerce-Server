const connection = require('../database/db')

class BlogModal {

  createBlog(blogData, cb) {
    const query = "INSERT INTO blogs (`title`, `description`, `author`, `photo`, `keyword`, `categories`) VALUES (?,?,?,?,?,?)";
    const values = [
      blogData.title,
      blogData.description,
      blogData.author,
      blogData.photo,
      blogData.keyword,
      blogData.categories
    ];
    connection.query(query, values, cb)
  }

  getAllBlogs(cb) {
    const query = 'SELECT * from blogs';
    connection.query(query, cb)
  }

  getSingleBlogById(blogId, cb) {
    const query = "SELECT * from blogs where id = ?"
    connection.query(query, [blogId], cb)
  }

  updateBlogById(blogId, blogData, cb) {
    const query = "UPDATE blogs SET `title`= ?,`description`= ?,`author`= ?,`photo`= ?,`keyword`= ?,`categories`= ? WHERE id = ?";
    const values = [
      blogData.title,
      blogData.description,
      blogData.author,
      blogData.photo,
      blogData.keyword,
      blogData.categories,
      blogId
    ];
    connection.query(query, values, cb)
  }

  deleteBlogById(blogId, cb) {
    const query = "DELETE FROM `blogs` WHERE id = ?";
    connection.query(query, [blogId], cb)
  }
}

module.exports = BlogModal