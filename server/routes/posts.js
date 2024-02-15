import { Router } from 'express';
import { getPosts, createPost, updatePost, likePost, deletePost, disLikePost, searchPost } from '../controllers/posts.js';

const router = Router();

router.get(`/`, getPosts);
router.get(`/search`, searchPost)
router.post(`/`, createPost);
router.patch('/dislikepost', disLikePost);
// router.get('/:id', getPost);
router.patch('/:id', updatePost);
router.delete('/:id', deletePost);
router.patch('/:id/likePost', likePost);

export default router;