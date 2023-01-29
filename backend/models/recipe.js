import mongoose, { Schema } from "mongoose";
import mongooseConnection from "../db.js";

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  ingredients: [
    {
      type: String,
      required: true,
    },
  ],
  instructions: [
    {
      type: String,
      required: true,
    },
  ],
  category: {
    type: String,
    required: true,
    enum: ["Dinner", "Breakfast", "Lunch", "Dessert"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  cookingTime: {
    type: Number,
    required: true,
  },
  servingSize: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    required: true,
  },
  // vegetarian: {
  //   type: Boolean,
  //   required: false,
  // },
  // isPublic: {
  //   type: Boolean,
  //   default: false,
  // },
  image: {
    type: String,
  },
  // createdAt: {
  //   type: Date,
  //   default: Date.now,
  // },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

const RecipeModel = mongooseConnection.model("Recipe", recipeSchema);

export { RecipeModel };
