import mongoose from "mongoose";

interface IUser {
  _id: string;
  username: string;
}

export const mapUsers = (users: Record<string, IUser>) => {
  return Object.keys(users).map(hash => {
    const { _id, username } = users[hash]
    return { _id, username }
  })
}

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
});

const ExerciseSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  userId: {
    type: String,
    required: true
  }
});

export const User = mongoose.model("User", UserSchema);
export const Exercise = mongoose.model("Exercise", ExerciseSchema);

