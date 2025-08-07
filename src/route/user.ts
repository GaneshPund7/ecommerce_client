import express, { Router } from 'express';
import { addUser, deleteUser, getUser, updateUser } from '../controller/user';
 
const user: Router = express.Router();

user.get('/', getUser);
user.post('/', addUser);
user.put('/:id', updateUser);
user.delete('/:id', deleteUser);

export default user;
