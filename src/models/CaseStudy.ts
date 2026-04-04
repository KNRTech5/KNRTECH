import mongoose, { Schema } from "mongoose";

const CaseStudySchema = new Schema({
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  shortDescription: {
    type: String,
  },
  images: {
    type: [String],
    default: [],
  },
  metrics: {
    type: [
      {
        label: String,
        value: String,
      },
    ],
    default: [],
  },
  technologies: {
    type: [String],
    default: [],
  },
  isPublished: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.CaseStudy ||
  mongoose.model("CaseStudy", CaseStudySchema);
