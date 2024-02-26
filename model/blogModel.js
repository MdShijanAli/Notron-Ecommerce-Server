const connection = require('../database/db')

class BlogModal {
    getAllBlogs(cb){
      const query = 'SELECT * from blogs';
      connection.query(query, cb)
    }
}

module.exports = BlogModal