// routes.js
const express = require('express');
const BlogController = require('../controllers/blogController')
const ReviewController = require('../controllers/reviewController');
const ownerController = require('../controllers/ownerController')();
const managerController = require('../controllers/managerController')();
const salesMansController = require('../controllers/salesMansController')();
const productController = require('../controllers/productController')();
const brandController = require('../controllers/brandController')();
const categoryController = require('../controllers/categoryController')();
const supplierController = require('../controllers/supplierController')();
const clientController = require('../controllers/clientController')();

const router = express.Router();
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
router.get('/api/brands/search', brandController.searchBrands);
router.get('/api/brands/:brandID', brandController.getBrandById);
router.put('/api/brands/:brandID', brandController.editBrand);
router.delete('/api/brands/:brandID', brandController.deleteBrand);

// Categories API
router.post('/api/categories', categoryController.createCategory);
router.get('/api/categories', categoryController.getAllCategory);
router.get('/api/categories/search', categoryController.searchCategories);
router.get('/api/categories/:categoryID', categoryController.getCategoryById);
router.put('/api/categories/:categoryID', categoryController.editCategory);
router.delete('/api/categories/:categoryID', categoryController.deleteCategory);

// Supplier API
router.post('/api/suppliers', supplierController.createSupplier);
router.get('/api/suppliers', supplierController.getAllSuppliers);
router.get('/api/suppliers/search', supplierController.searchSuppliers);
router.get('/api/suppliers/:supplierID', supplierController.getSupplierById);
router.put('/api/suppliers/:supplierID', supplierController.editSupplier);
router.delete('/api/suppliers/:supplierID', supplierController.deleteSupplier);

// Clients API
router.post('/api/clients', clientController.createClient);
router.get('/api/clients', clientController.getAllClients);
router.get('/api/clients/search', clientController.searchClients);
router.get('/api/clients/:clientID', clientController.getClientById);
router.put('/api/clients/:clientID', clientController.editClient);
router.delete('/api/clients/:clientID', clientController.deleteClient);

// Sales Mans API
router.post('/api/sales_mans', salesMansController.createSalesMans);
router.get('/api/sales_mans', salesMansController.getAllSalesMans);
router.get('/api/sales_mans/search', salesMansController.searchSalesMans);
router.get('/api/sales_mans/:salesMansID', salesMansController.getSalesMansById);
router.put('/api/sales_mans/:salesMansID', salesMansController.editSalesMans);
router.delete('/api/sales_mans/:salesMansID', salesMansController.deleteSalesMans);

// Manager API
router.post('/api/managers', managerController.createManager);
router.get('/api/managers', managerController.getAllManagers);
router.get('/api/managers/search', managerController.searchManagers);
router.get('/api/managers/:managerID', managerController.getManagerById);
router.put('/api/managers/:managerID', managerController.editManager);
router.delete('/api/managers/:managerID', managerController.deleteManager);

// Owner API
router.post('/api/owners', ownerController.createOwner);
router.get('/api/owners', ownerController.getAllOwners);
router.get('/api/owners/search', ownerController.searchOwners);
router.get('/api/owners/:ownerID', ownerController.getOwnerById);
router.put('/api/owners/:ownerID', ownerController.editOwner);
router.delete('/api/owners/:ownerID', ownerController.deleteOwner);

module.exports = router;
