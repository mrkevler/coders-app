
import express from "express";
import ContentModel from "../models/Content.js";
import UserModel from "../models/User.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.post("/:userID", async (req, res) => {
  try {
    const { userID } = req.params;
    const user = await UserModel.findOne({ _id: userID });
    if (!user) {
      throw new Error("User not found");
    }
    const { title } = req.body;
    const newContent = await ContentModel.create({
      title,
      owners: [user._id],
    });
    res.status(200).json({ newContent });
  } catch (error) {
    res.status(400).json({ message: error?.message });
  }
});

router.get("/:contentID", auth, async (req, res) => {
  try {
    const { contentID } = req.params;
    const content = await ContentModel.findOne({ _id: contentID });
    if (!content) {
      throw new Error("Content not found");
    }

    const userIsOwner = content.owners
      .map((o) => o.toString())
      .includes(req.uderID);
    if (!userIsOwner) {
      throw new Error("You are not the owner of this content");
    }
    res.status(200).json({ content });
  } catch (error) {
    res.status(400).json({ message: error?.message });
  }
});

export default router;
