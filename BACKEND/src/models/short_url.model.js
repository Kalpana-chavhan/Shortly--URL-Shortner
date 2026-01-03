import mongoose from "mongoose";

// ---------------- Analytics Schema ----------------
const AnalyticsSchema = new mongoose.Schema({
  ip: { type: String },
  referrer: { type: String, default: null },

  device: {
    ua: { type: String }, // raw UA
    browser: {
      name: String,
      version: String,
    },
    os: {
      name: String,
      version: String,
    },
    device: {
      vendor: String,
      model: String,
      type: String, // mobile/desktop/tablet
    },
    screen: {
      width: Number,
      height: Number,
    },
  },

  location: {
    country: String,
    region: String,
    city: String,
    ll: [Number], // [lat, lon]
  },

  createdAt: { type: Date, default: Date.now },
});

// ---------------- Short URL Schema ----------------
const ShortUrlSchema = new mongoose.Schema(
  {
    full_url: {
      type: String,
      required: true,
    },

    short_url: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    clicks: {
      type: Number,
      default: 0,
    },

    analytics: [AnalyticsSchema], // merged analytics list
  },
  { timestamps: true }
);

export default mongoose.model("ShortUrl", ShortUrlSchema);
