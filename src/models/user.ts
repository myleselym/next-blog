import { Schema, model, models, Document, Model } from "mongoose";
import { IUser } from "../../types";

const UserSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required!"],
  },
  email: {
    type: String,
    unique: [true, "Email already exists!"],
    required: [true, "Email is required!"],
  },
  username: {
    type: String,
    required: [true, "Username is required!"],
    match: [
      /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
      "Username invalid, it should contain 8-20 alphanumeric letters and be unique!",
    ],
  },
  image: {
    type: String,
    required: [true, "Image is required"],
  },
});

const User = (models.User as Model<IUser>) || model<IUser>("User", UserSchema);

export default User;
