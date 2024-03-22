
import { signUp, login  } from "../controllers/auth.controller";
import express from 'express';

const router = express.Router();

router.post('/signup', signUp);
router.post('/login', login);

export default router;