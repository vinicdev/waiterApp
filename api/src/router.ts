import path from 'node:path';

import { Router } from 'express';
import multer from 'multer';

import { listCategories } from './app/useCases/categories/listCategories';
import { createCategory } from './app/useCases/categories/createCategory';
import { listProduct } from './app/useCases/products/listProducts';
import { createProduct } from './app/useCases/products/createProduct';
import { listProductsByCategory } from './app/useCases/categories/listProductsByCategory';
import { listOrders } from './app/useCases/orders/listOrders';
import { createOrder } from './app/useCases/orders/createOrder';
import { changeOrderStatus } from './app/useCases/orders/changeOrderStatus';
import { deleteCategories } from './app/useCases/categories/deleteCategories';
import { cancelOrder } from './app/useCases/orders/cancelOrder';
import { deleteProduct } from './app/useCases/products/deleteProduct';

export const router = Router();

const upload = multer({
  storage: multer.diskStorage({
    destination(req, fill, callback) {
      callback(null, path.resolve(__dirname, '..', 'uploads'));
    },

    filename(req, file, callback) {
      callback(null, `${Date.now()}-${file.originalname}`);
    }
  }),
});

// List Categories
router.get('/categories', listCategories);

// Create category
router.post('/categories', createCategory);

//Delete category
router.delete('/categories/:categoryId', deleteCategories);

// List Products
router.get('/products', listProduct);

// Create Product
router.post('/products', upload.single('image'), createProduct);

// Get products by category
router.get('/categories/:categoryId/products', listProductsByCategory);

// Delete product
router.delete('/products/:productId', deleteProduct);

// List orders
router.get('/orders', listOrders);

// Create orders
router.post('/orders', createOrder);

// Change order status
router.patch('/orders/:orderId', changeOrderStatus);

// Delete/cancel order
router.delete('/orders/:orderId', cancelOrder);
