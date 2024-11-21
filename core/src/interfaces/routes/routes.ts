import express, { Router } from 'express';

import { originValidator, authMiddleware } from '../../infrastructure/security/JwtAccessTokenManager';
import signToken from '../controllers/AuthorizationController';
import userRoutes from './userRoutes';

export function createRouter(): Router {
  const router = express.Router();

  router.get('/', (req, res) => {
    res.send('Hello World!');
  });

  router.post('/login', originValidator, (req, res) => {
    signToken(req, res)
  });

  router.use('/users', userRoutes);

  return router;
}