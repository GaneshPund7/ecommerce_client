import express, { Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import user from './src/route/user';
import { AppDataSource } from './config/db'; 
import product from './src/route/product';
import auth from './src/route/auth';

dotenv.config()
const PORT = process.env.PORT || 3000

const app: Application = express();

app.use(express.json({ limit: '50mb' }));

app.use(cors());
AppDataSource.initialize()
  .then(() => {
    console.log('Database connected successfuly')

    app.use('/user', user)
    app.use('/product', product)
    app.use('/login', auth)


    app.listen(PORT, () => {

      console.log(`Server is running on port: ${PORT}`)
    
    })

  })
  .catch((error) =>  {

    console.error('Somthing went wrong :', error)
  });
