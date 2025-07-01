import mongoose from "mongoose";

const DOCUMENT_NAME = "User";
const COLLECTION_NAME = "users";

const schema = new mongoose.Schema(
  {
    firstName: {
      type: mongoose.Schema.Types.String,
      required: true,
      trim: true,
    },
    lastName: {
      type: mongoose.Schema.Types.String,
      required: true,
      trim: true,
    },
    email: {
      type: mongoose.Schema.Types.String,
      required: true,
      unique: true,
      trim: true,
    },
    username: {
      type: mongoose.Schema.Types.String,
      required: true,
      unique: true, // username must be unique (selection has to be handled)
      trim: true, // removes the space
    },
    password: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model(DOCUMENT_NAME, schema, COLLECTION_NAME);

export default UserModel;
