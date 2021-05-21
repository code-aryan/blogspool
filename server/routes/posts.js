import express from 'express';


import { approvePost, getPendingPosts, getApprovedPosts, getPosts, getPostsBySearch, getPost, createPost, updatePost, likePost, deletePost } from '../controllers/posts.js';

const router = express.Router();
import auth from "../middleware/auth.js";

router.get('/search', getPostsBySearch);
router.get('/', getPosts);
router.get('/:id', getPost);
router.get('/myblogs/:userid', auth, getApprovedPosts);
router.get('/mypendings/:role', auth, getPendingPosts);
 

router.post('/', auth,  createPost);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost); 
router.patch('/:id/likePost', auth, likePost);
router.patch('/:id/approvePost', auth, approvePost); 

export default router;