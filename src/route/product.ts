import express, { Router } from 'express';
import { getProduct, addProduct,  updateProduct, deleteProduct } from '../controller/product';
import productImgs from '../utils/upload';
 
const product: Router = express.Router();

product.get('/', getProduct);
 
product.post('/', productImgs, addProduct);

product.put('/:id',productImgs, updateProduct);
product.delete('/:id', deleteProduct);

export default product;
