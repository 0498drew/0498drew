import Trip from "../models/Trip";
import Review from "../models/Review.js";


export const createReview = async (req, res) => {

    const tripId = req.params.tripId;
    const newReview = new Review({...req.boy});

    try {
        const savedReview = await newReview.save()


        // after creating a new review now  update the reviews array of the trip
        await Trip.findByIdAndUpdate(tripId, {
            $push: {reviews: savedReview._id}
        })

        res.status(200).json({success:true, massage:'Review submitted',
        data:savedReview});

    } catch (err) {
        res.status(500).json({success:false, massage:'failed submit'})
    }
};