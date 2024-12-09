import { Schema, model } from 'mongoose';

const Base64ImageEventSchema = new Schema({
    eventId: {
        type: String,
        required: [true]
    },
    image: {
        type: String
    },
    updateData: {
        type: Date
    }
});

const EventImageModel = model('userProfileImage', Base64ImageEventSchema);
export default EventImageModel;