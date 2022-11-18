import {Router} from 'express';
import { createprofileController, verifyemailController } from '../controller/userController';
const router=Router();

router.post('/create',createprofileController)
router.post('/get', verifyemailController)
// router.post('/login',loginController)
// router.post('/logut',logutController)


export default router;