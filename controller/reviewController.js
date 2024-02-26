const ReviewModal =  require('../model/reviewModal')

class ReviewController{

  addReview(req,res){
    const reviewData = req.body;
    const reviewModal = new ReviewModal();
    reviewModal.addReview(reviewData, (err, result)=>{
      if(err){
        console.error('Error Adding Review', err)
        res.status(500).send('Internal Server Error')
      }
      else{
        const reviewId = result.insertId; // Assuming product_id is part of reviewData
        reviewModal.getReviewDetails(reviewId, (err, reviews) => {
          if (err) {
            console.error('Error Getting Reviews for the Product', err);
            res.status(500).send('Internal Server Error');
          } else {
            res.json({ message: 'Review Added successfully', status: 'success', reviews });
          }
        });
      }
    })
  }

  getReviewDetails(req, res){
    const reviewId = req.params.reviewId;
    const reviewModal = new ReviewModal();
    reviewModal.getReviewDetails(reviewId, (err, result)=>{
      if(err){
        console.error('Error Getting Reviews with This ID', err)
        res.status(500).send('Internal Server Error')
      }else{
        res.json(result)
      }
    })
  }

  getAllReviews(req, res){
    const reviewModal = new ReviewModal();
    reviewModal.getAllReviews((err, result)=>{
      if(err){
        console.error('Error Getting Reviews', err);
        res.status(500).send('Internal Server Error')
      }else{
        res.json(result)
      }
    })
  }

  getReviewsByProductID(req, res){
    const productId = req.params.productId;
    const reviewModal = new ReviewModal();
    reviewModal.getReviewsByProductID(productId, (err, result)=>{
      if(err){
        console.error('Error Getting Reviews with This ID', err)
        res.status(500).send('Internal Server Error')
      }else{
        res.json(result)
      }
    })
  }

  deleteReviewByID(req, res){
    const reviewId = req.params.reviewId;
    const reviewModal = new ReviewModal();
    reviewModal.deleteReviewByID(reviewId, (err, result)=>{
      if(err){
        console.error('Error Deleting Review with this ID', err);
        res.status(500).send('Internal Server Error')
      }
      res.json({ message: 'Review deleted successfully', status: 'success' });
    })
  }


}

module.exports = ReviewController