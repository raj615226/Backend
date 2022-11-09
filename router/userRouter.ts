import {Router} from 'express';
import { createprofileController, verifyemailController, loginController, logutController } from '../controller/userController';
const router=Router();

router.post('/create',createprofileController)
router.post('/verify', verifyemailController)
router.post('/login',loginController)
router.post('/logut',logutController)


export default router;