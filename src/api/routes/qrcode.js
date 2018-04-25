import express from 'express';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';

import {
  uuid
} from './../controllers/qrcode';

const router = express.Router();

router.get('/:uuid', asyncHandler(async (req, res, next) => {
  // const result = await userExist(req.params.email);
  // res.status(result.code).send(result);
}));

export default router;
