import express, { Router, Request, Response } from 'express';

import { originValidator, authMiddleware } from '../../infrastructure/security/JwtAccessTokenManager';
import UsersController from '../controllers/UsersController';

const router: Router = express.Router();
const userRepo = UsersController.getInstance();

// Create User
router.post('/create', originValidator, authMiddleware, async (req: Request, res: Response) => {
  const { name, role, gps_x, gps_y } = req.body;
  try {
    const result = await userRepo.createUser(name, role, gps_x, gps_y);
    res.status(201).json({ message: result });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete User
router.post('/delete', originValidator, authMiddleware, async (req: Request, res: Response) => {
  const { id } = req.body;
  try {
    const result = await userRepo.deleteUser(id);
    res.status(200).json({ message: result });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Change Role
router.post('/change-role', originValidator, authMiddleware, async (req: Request, res: Response) => {
  const { id, role } = req.body;
  try {
    const result = await userRepo.changeRole(id, role);
    res.status(200).json({ message: result });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update Location
router.post('/update-location', originValidator, authMiddleware, async (req: Request, res: Response) => {
  const { id, gps_x, gps_y } = req.body;
  try {
    const result = await userRepo.updateLocation(id, gps_x, gps_y);
    res.status(200).json({ message: result });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get List of Sellers
router.post('/list-sellers', originValidator, authMiddleware, async (req: Request, res: Response) => {
  try {
    const result = await userRepo.getListSeller();
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get List of Customers
router.post('/list-customers', originValidator, authMiddleware, async (req: Request, res: Response) => {
  try {
    const result = await userRepo.getListCustomer();
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;