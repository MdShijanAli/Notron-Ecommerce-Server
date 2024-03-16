const connection = require('../database/db')

class ReviewModal {

  addReview(reviewData, cb){
    const query = "INSERT INTO reviews (`comment`, `rating`, `title`, `name`, `email`, `product_id`) VALUES (?, ?, ?, ?, ?, ?)";
    const values = [
      reviewData.comment,
      reviewData.rating,
      reviewData.title,
      reviewData.name,
      reviewData.email,
      reviewData.product_id
    ];
    connection.query(query, values, cb);
  }

  getReviewDetails(reviewId, cb){
    const query = "SELECT * FROM `reviews` WHERE `id` = ?"
    connection.query(query, [reviewId], cb)
  }

  getAllReviews(cb){
    const query = 'SELECT * from reviews';
    connection.query(query, cb)
  }

  getReviewsByProductID(productId, cb){
    const query = 'SELECT * FROM `reviews` WHERE `product_id` = ?'
    connection.query(query, [productId], cb)
  }

  editReviewByID(reviewId, reviewData, cb){
    const query = "UPDATE `reviews` SET `comment` = ?,`rating`=?,`title`=?,`name`=?,`email`=?,`product_id`=? WHERE id = ?";
    const values = [
      reviewData.comment,
      reviewData.rating,
      reviewData.title,
      reviewData.name,
      reviewData.email,
      reviewData.product_id,
      reviewId
    ];
    connection.query(query, values, cb)
  }
  
  deleteReviewByID(reviewId, cb){
    const query = 'DELETE FROM reviews WHERE id = ?';
    connection.query(query, [reviewId], cb)
  }


}


module.exports = ReviewModal;