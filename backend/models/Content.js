
import mongoose from "mongoose";

const DOCUMENT_NAME = "Content";
const COLLECTION_NAME = "contents";

const schema = new mongoose.Schema(
  {
    title: {
      type: mongoose.Schema.Types.String,
      required: true,
      unique: true, // username must be unique (selection has to be handled)
      trim: true, // removes the space
    },
    owners: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

const ContentModel = mongoose.model(DOCUMENT_NAME, schema, COLLECTION_NAME);

export default ContentModel;
