
import Trip from '../models/Trip.js'


export const createTrip = async (req, res)=>{

    const newTrip = new Trip(req.body);

    try {
        const savedTrip = await newTrip.save();

        res
        .status(200)
        .json({
            success:true, 
            massage: "Successfully created",
            data: savedTrip,
        });
    } catch (err) {
        res
        .status(500)
        .json({
            success: false, 
            massage:"Failed to create. Try again",
        });
    }
};

// update trip
export const updateTrip = async (req, res) => {
    const id = req.params.id;

    try {
        const updateTrip = await Trip.findByIdAndUpdate(id, {
            $set: req.body
        }, {new:true})

        res.status(200).json({
            success:true, 
            massage: "Successfully updateTrip",
            data: updateTrip,
        });
    } catch (err) {
        res.status(500).json({
            success: false, 
            massage: "failed to update",
        });
    }
};
// delete trip
export const deleteTrip = async (req, res) => {
    const id = req.params.id;

    try {
        await Trip.findByIdAndDelete(id);

        res.status(200).json({
            success:true, 
            massage:"Successfully deleted",
        });
    } catch (err) {
        res.status(500).json({
            success: false, 
            massage: "failed to delete",
        });
    }
};
    
// getSingle trip
export const getSingleTrip = async (req, res) => {
    const id = req.params.id;

    try {
        const trip = await Trip.findById(id).populate("reviews");

        res.status(200).json({
            success:true, 
            massage:"Successfully",
            data: trip,
        });
    } catch (err) {
        res.status(404).json({
            success: false, 
            massage: "not found",
        });
    }
};
    
// getAll trip
export const getAllTrip = async (req, res) => {
    // for pagination
    const page = parseInt(req,query.page);

    try {
        const trips = await Trip.find({})
        .populate("reviews")
        .skip(page * 8)
        .limit(8);

        res.status(200).json({
            success:true,
            count: trips.length, 
            massage:"Successfully",
            data: trips,
        });
    } catch (err) {
        res.status(404).json({
            success: false, 
            massage: "not found",
        });
    }
};


// get trip by search
export const getTripBySearch = async(req,res)=>{

    // here 'i' means case sensitive
    const city = new RegExp(req.query.city, 'i');
    const distance = parseInt(req.query.distance);
    const maxGroupSize = parseInt(req, query.maxGroupSize);

    try{

        //gte means greater than equals 
        const trips = await Trip.find({ 
            city, 
            distance:{$gte:distance}, 
            maxGroupSize:{$gte:maxGroupSize},
        }).populate("reviews");

        res.status(200).json({
            success:true, 
            massage:"Successfully",
            data: trips,
        });
    } catch (err){
        res.status(404).json({
            success: false, 
            massage: "not found",
        });
    }
}


// get featured trip
export const getFeaturedTrip = async (req, res) => {
    
    try {
        const trips = await Trip.find({featured: true})
        .populate("reviews")
        .limit(8);

        res.status(200).json({
            success:true, 
            massage:"Successfully",
            data: trips,
        });
    } catch (err) {
        res.status(404).json({
            success: false, 
            massage: "not found",
        });
    }
};

// get trip counts
export const getTripCount = async (req, res) => {
    
    try {
        const tripCount = await Trip.estimateDocumentCount();

        res.status(200).json({
            success:true, 
            massage:"Successfully",
            data: tripCount,
        });
    } catch (err) {
        res.status(404).json({
            success: false, 
            massage: "failed to fetch",
        });
    }
};
