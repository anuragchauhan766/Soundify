import { Date, Schema, model, Document } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";

export interface IUser {
  name: string;
  email: string;
  password: string;
  dob: Date;
  gender: string;
  resetPasswordToken: string;
}

export interface UserDocument extends IUser, Document {
  matchPassword(inputPassword: string): Promise<boolean>;
  getSignedToken(): { accessToken: string; refreshToken: string };
  getResetPasswordToken(): Promise<string>;
}
const userSchema = new Schema<IUser>({
  name: {
    type: String,
    trim: true,
    required: [true, "Name required"],
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    required: [true, "Email required"],
  },
  password: {
    type: String,
    required: [true, "Password required"],
    minlength: 8,
  },
  dob: {
    type: Date,
    required: [true, "Date of birth required"],
  },
  gender: {
    type: String,
    required: [true, "Gender required"],
  },
  resetPasswordToken: {
    type: String,
    default: "",
  },
});

userSchema.pre("save", async function (this: UserDocument, next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods = {
  matchPassword: function (inputPassword: string) {
    return bcrypt.compare(inputPassword, this.password);
  },

  getSignedToken: function (this: UserDocument) {
    const accessToken = jwt.sign(
      { id: this._id },
      process.env.ACCESS_TOKEN_SECRET_KEY as string,
      {
        expiresIn: "30s",
      }
    );
    const refreshToken = jwt.sign(
      { id: this._id },
      process.env.REFRESH_TOKEN_SECRET_KEY as string,
      {
        expiresIn: "1d",
      }
    );
    return { accessToken, refreshToken };
  },
  getResetPasswordToken: async function (this: UserDocument) {
    const randomstring = crypto.randomBytes(20).toString("hex");
    const resetPasswordToken = jwt.sign(
      {
        randomstring,
      },
      process.env.RESET_PASSWORD_SECRET_KEY as string,
      {
        expiresIn: "1d",
      }
    );
    this.resetPasswordToken = resetPasswordToken;
    await this.save();
    return resetPasswordToken;
  },
};

export default model<UserDocument>("user", userSchema);
