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

// UserSchema.pre("save", async function (next) {
//   if(!this.isModified("password")){
//     next();
//   }
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
// });

// UserSchema.methods.matchPassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// }
const User = mongoose.model("User", UserSchema);

export default User;
