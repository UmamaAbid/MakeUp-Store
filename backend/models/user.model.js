import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    require: true,
  },

  password: {
    type: String,
    require: true,
  },

  password: {
    type: String,
  },

  phnNumber: {
    type: String,
  },

  role: {
    type: String,
    default: "user",
  },

  status: {
    type: Number,
    default: 0,
  },

},
    
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

export default User;
