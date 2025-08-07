import { Request, Response } from 'express';
import { AppDataSource } from '../../config/db';
 
import path from 'path';
import { Product } from '../model/product';
import { ProductImage } from '../model/productImgs';

export const getProduct = async (req: Request, res: Response) => {
  try {
    const productRepository = AppDataSource.getRepository(Product)

    const products = await productRepository.find({
      relations: ['images'],
      select: {
        id: true,
      productName: true,
      sku: true,
        price: true,
       images: {
          imageUrl: true
        }
      }
    })

    console.log("Products:", products);

    return res.status(200).json({
      message: "Products found successfully",
      result: products,
    });
  } catch (error: any ) {

    return res.status(500 ).json({message: "Something went wrong",
      error: error.message,
    });
  }
};
 
export const addProduct = async (req: Request, res: Response ) => {

  const { productName, sku, price } = req.body

  if (!productName || !sku || !price) {

return res.status(400).json({ message: "Required fields are missing" 

})
  }

  try {
    const productRepository = AppDataSource.getRepository(Product)

    const productImageRepository = AppDataSource.getRepository(ProductImage);

  
    const product = await productRepository.save({ productName, sku, price });

    
    if (req.files && Array.isArray(req.files) && req.files.length > 0) {

      const imageRecords = req.files.map((file: any) => {
        const image = new ProductImage()

    image.imageUrl = `/uploads/${file.filename}`;
    image.product = product; 
        return image;
      });

      await productImageRepository.save(imageRecords);
    }

    return res.status(201).json({
      message: "Product created successfully",
      productId: product.id,
    });

  } catch (error: any) {
    console.error("Add product error:", error)
    return res.status(500).json({
      
      message: "Failed to create product" ,
      error: error.message,
    });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const productRepository = 
    AppDataSource.getRepository(Product);

     const productImageRepository = AppDataSource.getRepository(ProductImage )

    const product = 
    await productRepository.findOne({ where: { id: Number(id) } })

    if (!product) {
      return res.status(404).json({ message: 'Product not found' } )
    }

    product.productName = req.body.productName || product.productName
   product.sku = req.body.sku || product.sku

    product.price = req.body.price || product.price

    await productRepository.save(product)


    if (req.files && Array.isArray(req.files) && req.files.length > 0) {
      await productImageRepository.delete({ product: { id: product.id } })

      const newImages = req.files.map((file: any) => 
        {
        const image = new ProductImage();
        image.imageUrl = `/uploads/${file.filename}`
     image.product = product;
        return image
      });

      await productImageRepository.save(newImages);
    }

    return res.status(200).json({
      message: 'Product updated successfully',
      product,
    });
  } catch (error: any) {
    console.error('Update product error:', error);
    return res.status(500).json({ message: 'Failed to update product',  error: error.message,
    });
  }
};


export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const productRepository = AppDataSource.getRepository(Product)

    await productRepository.delete(id);

    return res.status(200).json({ message: "Product deleted successfuly" })
    
  } catch (error: any) {
    return res.status(404).json( {
      message: "Something went wrong",

      error: error.message,
    })
  }
};


