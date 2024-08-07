const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

const CategoryModel = model('Category', CategorySchema);
module.exports = { CategoryModel };
