const ReviewModal = require('../models/reviewModal')

class ReviewController {

  addReview(req, res) {
    const reviewData = req.body;
    const reviewModal = new ReviewModal();
    reviewModal.addReview(reviewData, (err, result) => {
      if (err) {
        console.error('Error Adding Review', err)
        res.status(500).send('Internal Server Error')
      }
      else {
        const reviewId = result.insertId;
        reviewModal.getReviewDetails(reviewId, (err, result) => {
          if (err) {
            console.error('Error Getting Reviews for the Product', err);
            res.status(500).send('Internal Server Error');
          } else {
            res.json({ status: 'success', message: 'Executed Successfully', data: result.length > 0 ? result[0] : null });
          }
        });
      }
    })
  }

  editReviewByID(req, res) {
    const reviewId = req.params.reviewId;
    const reviewData = req.body;
    const reviewModal = new ReviewModal();
    reviewModal.editReviewByID(reviewId, reviewData, (err, result) => {
      if (err) {
        console.error('Error Editing Review', err)
        res.status(500).send('Internal Server Error')
      }
      else {
        reviewModal.getReviewDetails(reviewId, (err, result) => {
          if (err) {
            console.error('Error Getting Reviews for the Product', err);
            res.status(500).send('Internal Server Error');
          } else {
            res.json({ status: 'success', message: 'Executed Successfully', data: result.length > 0 ? result[0] : null });
          }
        });
      }
    })
  }

  getReviewDetails(req, res) {
    const reviewId = req.params.reviewId;
    const reviewModal = new ReviewModal();
    reviewModal.getReviewDetails(reviewId, (err, result) => {
      if (err) {
        console.error('Error Getting Reviews with This ID', err)
        res.status(500).send('Internal Server Error')
      } else {
        res.json({ status: 'success', message: 'Executed Successfully', data: result.length > 0 ? result[0] : null })
      }
    })
  }

  getAllReviews(req, res) {
    const reviewModal = new ReviewModal();
    reviewModal.getAllReviews((err, result) => {
      if (err) {
        console.error('Error Getting Reviews', err);
        res.status(500).send('Internal Server Error')
      } else {
        res.json({ status: 'success', message: 'Executed Successfully', data: result })
      }
    })
  }

  getReviewsByProductID(req, res) {
    const productId = req.params.productId;
    const reviewModal = new ReviewModal();
    reviewModal.getReviewsByProductID(productId, (err, result) => {
      if (err) {
        console.error('Error Getting Reviews with This ID', err)
        res.status(500).send('Internal Server Error')
      } else {
        res.json({ status: 'success', message: 'Executed Successfully', data: result })
      }
    })
  }

  deleteReviewByID(req, res) {
    const reviewId = req.params.reviewId;
    const reviewModal = new ReviewModal();
    reviewModal.deleteReviewByID(reviewId, (err, result) => {
      if (err) {
        console.error('Error Deleting Review with this ID', err);
        res.status(500).send('Internal Server Error')
      }
      res.json({ status: 'success', message: 'Executed successfully' });
    })
  }


}

module.exports = ReviewController