import { Router } from 'express';
import dashboardRoutes from './dashboard.js';
import homeRoute from './home.js';
import userRoutes from './user.js';
const router = Router();

router.use('/', homeRoute);
router.use('/dashboard', dashboardRoutes);
router.use('/', userRoutes);

export default router;
