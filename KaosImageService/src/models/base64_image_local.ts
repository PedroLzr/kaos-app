import { Schema, model } from 'mongoose';

const Base64ImageLocalSchema = new Schema({
    localId: {
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

const LocalImageModel = model('userProfileImage', Base64ImageLocalSchema);
export default LocalImageModel;