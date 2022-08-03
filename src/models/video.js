const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const VideoSchema = new Schema(
  {
    video: {
      link: {
        type: String,
        required: true,
      },
      size: {
        type: String,
        requried: true,
      },
      type: [],
      tags: [],
      receiver_type: [],
    },
    audio: {
      icon: { type: String },
      audio_id: {
        type: ObjectId,
        required: false,
      },
      link: {
        type: String,
        required: false,
      },
      name: { type: String },
    },
    description: { type: String, required: false },
    author: {
      avatar: {
        type: String,
        reuqired: true,
      },
      name: {
        type: String,
        requried: true,
      },
      username: {
        type: String,
        required: true,
      },
    },
    commnet: { type: ObjectId, required: fasle },
    tag: [],
    is_public: {
      type: Boolean,
      default: true,
    },
    is_adc: { type: Boolean, default: fasle },
    is_like: { type: Boolean, default: false },
  },
  { timestamps: true }
);
const Videos = mongoose.model("Videos", VideoSchema);

module.exports = Videos;
