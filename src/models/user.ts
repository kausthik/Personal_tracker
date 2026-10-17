import mongoose, { Schema, models, model } from "mongoose";
 
export interface IUser {
  name: string;
  email: string;
  password: string;
  heightCm?: number;
  startingWeightKg?: number;
  currentWeightKg?: number;
  targetWeightKg?: number;
  dailyCalorieTarget?: number;
  passwordChangedAt?: Date;
  failedLogins?: number;
  lockUntil?: Date;
  createdAt: Date;
}
 
const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  heightCm: { type: Number },
  startingWeightKg: { type: Number },
  currentWeightKg: { type: Number },
  targetWeightKg: { type: Number },
  dailyCalorieTarget: { type: Number, default: 2000 },
  passwordChangedAt: { type: Date },
  failedLogins: { type: Number, default: 0 },
  lockUntil: { type: Date },
  createdAt: { type: Date, default: Date.now },
});
 
export default models.User || model<IUser>("User", UserSchema);
 