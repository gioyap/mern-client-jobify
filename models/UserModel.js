import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    lastName: {
      type: String,
      default: 'yap',
    },
    location: {
      type: String,
      default: 'pulilan',
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
  });

  export default mongoose.model('User', UserSchema);