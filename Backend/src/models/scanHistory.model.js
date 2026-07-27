import mongoose from "mongoose";

const scanHistorySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    scanType: {
      type: String,
      enum: ["url", "text", "image"],
      required: true,
    },

    input: {
      type: String,
      required: true,
    },

    image: {
      url: String,
      publicId: String,
    },

    result: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const ScanHistory = mongoose.model(
  "ScanHistory",
  scanHistorySchema
);