import {Router} from 'express';
import { createprofileController, verifyemailController } from '../controller/userController';
const router=Router();

router.post('/create',createprofileController)
router.post('/verify', verifyemailController)


export default router;