import express, { NextFunction, Request, Response } from 'express';

import {signup, login, logout } from './../controllers/authController'

const router = express.Router();

router.post('/signup', signup);
router.post('/login',login);
router.get('/logout', logout);

export default router;