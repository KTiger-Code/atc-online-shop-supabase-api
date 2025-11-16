import { Router } from 'express';
import { YourController } from '../controllers';

const router = Router();

// Define your routes here
router.get('/example', YourController.exampleMethod);

export default router;