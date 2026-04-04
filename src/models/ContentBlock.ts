import mongoose, { Schema } from "mongoose";

const ContentBlockSchema = new Schema({
  section: {
    type: String,
    required: true,
    unique: true,
  },
  content: {
    type: Schema.Types.Mixed,
    default: {},
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  updatedBy: {
    type: String,
  },
});

export default mongoose.models.ContentBlock ||
  mongoose.model("ContentBlock", ContentBlockSchema);
