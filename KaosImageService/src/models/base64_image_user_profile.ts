import { Schema, model } from 'mongoose';

const Base64ImageUserProfileSchema = new Schema({
    userId: {
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

const UserProfileImageModel = model('userProfileImage', Base64ImageUserProfileSchema);
export default UserProfileImageModel;