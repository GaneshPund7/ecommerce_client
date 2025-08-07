import express, { Router } from 'express';
import { login } from '../auth/checkAuth';

const auth: Router = express.Router();

auth.post('/', login);

export default auth;
