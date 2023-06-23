
import express from 'express'
import { 
    createTrip, 
    deleteTrip, 
    updateTrip, 
    getAllTrip, 
    getSingleTrip, 
    getTripBySearch,
    getTripCount
} from './../controllers/tripController.js';
import { verifyAdmin } from '../utils/verifyToken.js';


const router = express.Router();


// create new trip
router.post("/", verifyAdmin, createTrip);

// update trip
router.put("/:id", verifyAdmin, updateTrip);

// delete trip
router.delete("/:id", verifyAdmin, deleteTrip);

// get single trip
router.get("/:id", getSingleTrip);

// get all trip
router.get("/", getAllTrip);

// get by search
router.get("/search/getTripBySearch", getTripBySearch);
router.get("/search/getFeaturedTrips", getFeaturedTrip);
router.get("/search/getTripCount", getTripCount);

export default router;