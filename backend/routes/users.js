import express from 'express';
import { getAllUsers, loginUserAccount, logoutUser, registerUserAccount, showOtherUser, verificationUserAccountLink } from '../controllers/userController.js';
import upload from '../utils/muter/multer.js';
import { authorizationMiddleware } from '../middleWares/authentication.js';
import { validateRegisterAccount } from '../validations/users.js';
const userRouter = express.Router();

userRouter.get('/',getAllUsers)
userRouter.get('/getOtherUser',authorizationMiddleware, showOtherUser)
userRouter.post('/', upload.single('image'), validateRegisterAccount, registerUserAccount)
userRouter.get('/verify-user', verificationUserAccountLink)
userRouter.post('/login', loginUserAccount)
userRouter.post('/logout', logoutUser)
// userRouter.get('/forget-password/:email', forgetPassword)
export default userRouter;