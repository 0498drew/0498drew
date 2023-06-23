import express from 'express'
import { 
    deleteUser, 
    getSingleUser, 
    getAllUser, 
    createUser, 
    updateUser 
} from '../controllers/userController';
const router = express.Router();

import { verifyAdmin, verifyUser } from "../utils/verifyToken";


// update new
router.put("/:id",verifyUser, updateUser);

// delete user
router.delete("/:id",verifyUser, deleteUser);

// get single user
router.get("/:id", verifyUser, getSingleUser);

// get all user
router.get("/",verifyAdmin, getAllUser);

export default router