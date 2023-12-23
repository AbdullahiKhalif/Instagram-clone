import express from 'express';
import { authorizationMiddleware } from '../middleWares/authentication.js';
import upload from '../utils/muter/multer.js';
import { createPost, deletePost, getAllPosts, getPostInfo, toglePostLikes, updatePost } from '../controllers/postContoller.js';
import { commentPost, updateComment, } from '../controllers/commentController.js';
const postRouter = express.Router();
postRouter.post('/',authorizationMiddleware, upload.single('image'), createPost)
postRouter.put('/:id',authorizationMiddleware, upload.single('image'), updatePost)
postRouter.post('/likePost/:id',authorizationMiddleware,toglePostLikes)
postRouter.get('/', getAllPosts)
postRouter.post('/createComment/:id', authorizationMiddleware, commentPost)
postRouter.get('/:id',authorizationMiddleware, getPostInfo)
postRouter.delete('/:id', authorizationMiddleware, deletePost);
postRouter.put('/updateComment/:id', authorizationMiddleware, updateComment)

export default postRouter;