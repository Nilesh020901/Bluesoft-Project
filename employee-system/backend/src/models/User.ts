import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String },
  role: { type: String, enum: ["employee", "hr"], default: "employee" },
  loginTime: { type: Date },
  logoutTime: { type: Date },
  status: { type: String, enum: ["Idle", "Login", "Logout"], default: "Idle" }
});

export default mongoose.model("User", userSchema);