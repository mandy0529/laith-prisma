import express from 'express';
import {createPost, getSinglePost} from '../controllers/postController.js';

// ------------------------------------------------------

const router = express.Router();

router.route('/').post(createPost);
router.route('/:id').get(getSinglePost);

export default router;
