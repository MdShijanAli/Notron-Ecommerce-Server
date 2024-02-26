// routes.js
const express = require('express');
const ProductController = require('../controller/productController');
const BlogController = require('../controller/blogController')
const ReviewController = require('../controller/reviewController')

const router = express.Router();
const productController = new ProductController();
const blogController = new BlogController();
const reviewController = new ReviewController();

// Products API
router.get('/api/products', productController.getAllProducts);
router.get('/api/products/:productId', productController.getProductById);

// Blogs API
router.get('/api/blogs', blogController.getAllBlogs)

// Reviews API
router.post('/api/reviews', reviewController.addReview);
router.get('/api/reviews', reviewController.getAllReviews);
router.get('/api/reviews/:reviewId', reviewController.getReviewDetails)
router.get('/api/reviews/:productId', reviewController.getReviewsByProductID)
router.delete('/api/reviews/:reviewId', reviewController.deleteReviewByID)

module.exports = router;
