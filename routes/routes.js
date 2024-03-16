// routes.js
const express = require('express');
const ProductController = require('../controllers/productController');
const BlogController = require('../controllers/blogController')
const ReviewController = require('../controllers/reviewController')

const router = express.Router();
const productController = new ProductController();
const blogController = new BlogController();
const reviewController = new ReviewController();

// Products API
router.post('/api/products', productController.createProduct);
router.put('/api/products/:productId', productController.editProductById);
router.get('/api/products', productController.getAllProducts);
router.get('/api/products/:productId', productController.getProductById);
router.delete('/api/products/:productId', productController.deleteProductById);

// Blogs API
router.post('/api/blogs', blogController.createBlog)
router.put('/api/blogs/:blogId', blogController.updateBlogById)
router.get('/api/blogs', blogController.getAllBlogs)
router.get('/api/blogs/:blogId', blogController.getSingleBlogById)
router.delete('/api/blogs/:blogId', blogController.deleteBlogById)

// Reviews API
router.post('/api/reviews', reviewController.addReview);
router.get('/api/reviews', reviewController.getAllReviews);
router.get('/api/reviews/:reviewId', reviewController.getReviewDetails)
router.put('/api/reviews/:reviewId', reviewController.editReviewByID)
router.get('/api/reviews/product/:productId', reviewController.getReviewsByProductID)
router.delete('/api/reviews/:reviewId', reviewController.deleteReviewByID)

module.exports = router;
