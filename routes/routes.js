// routes.js
const express = require('express');
const BlogController = require('../controllers/blogController')
const ReviewController = require('../controllers/reviewController')

const router = express.Router();
const productController = require('../controllers/productController')();
const brandController = require('../controllers/brandController')();
const categoryController = require('../controllers/categoryController')();
const blogController = new BlogController();
const reviewController = new ReviewController();

// Products API
router.post('/api/products', productController.createProduct);
router.put('/api/products/:productId', productController.editProductById);
router.get('/api/products', productController.getAllProducts);
router.get('/api/products/search', productController.searchProducts);
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

// Brands API
router.post('/api/brands', brandController.createBrand);
router.get('/api/brands', brandController.getAllBrands);
router.get('/api/brands/:brandID', brandController.getBrandById);
router.put('/api/brands/:brandID', brandController.editBrand);
router.delete('/api/brands/:brandID', brandController.deleteBrand);

// Categories API
router.post('/api/categories', categoryController.createCategory);
router.get('/api/categories', categoryController.getAllCategory);
router.get('/api/categories/:categoryID', categoryController.getCategoryById);
router.put('/api/categories/:categoryID', categoryController.editCategory);
router.delete('/api/categories/:categoryID', categoryController.deleteCategory);

module.exports = router;
