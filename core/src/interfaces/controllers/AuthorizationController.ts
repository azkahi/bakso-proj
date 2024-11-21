import jwt from 'jsonwebtoken'

import UsersController from './UsersController';
import { getIO } from '../../infrastructure/webserver/socket';

const JWT_SECRET_KEY = process.env.SECRET;

const userRepo = UsersController.getInstance();

export default async function signToken(req, res) {
  const { name, role, gps_x, gps_y } = req.body;

  if (!name || !role) {
    res.status(400).json({ message: 'name and role are required' });
  }

  try {
    const userId = await userRepo.createUser(name, role, null, null); 
    const token = jwt.sign({ userId }, JWT_SECRET_KEY, { expiresIn: '24h' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while processing your request' });
  }
}