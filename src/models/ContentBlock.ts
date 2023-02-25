const { model, Schema } = require("mongoose");

const contentBlockSchema = new Schema({
  contentBlockID: {
    type: Schema.Types.ObjectId,
    index: true,
    required: true,
    auto: true,
  },
  name: String,
  type: String,
  content: String,
  orderNumber: Number,
  createdAt: String,
  updatedAt: String,
});

module.exports = model("ContentBlock", contentBlockSchema);
