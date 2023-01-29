import express from "express";
import { RecipeModel } from "../models/recipe.js";
import { CommentModel } from "../models/comment.js";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

const router = express.Router();

// Home Route to get recipes
router.get("/home", async (req, res) => {
  try {
    const randomRecipes = await RecipeModel.aggregate([
      { $sample: { size: 4 } },
    ]);
    const newRecipes = randomRecipes.map((recipe) => {
      if (recipe.image) {
        recipe.image = cloudinary.url(recipe.image, {
          width: 300,
          height: 300,
          crop: "fill",
        });
      }
      return recipe;
    });
    res.json(newRecipes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GETS ALL RECIPES
router.get("/all", async (req, res) => {
  try {
    //Find all recipes created by the current user
    const recipes = await RecipeModel.find({ isPublic: true });
    // Send the recipes as the response
    res.json({ recipes });
  } catch (err) {
    console.log("error", err);
    res.status(500).json({ error: err.message });
  }
});

// //SEARCH USERS RECIPES FOR SPECIFIC INGREDIENTS
// router.get("/search-ingredients", async (req, res) => {
//   try {
//     // Get the ingredients from the query parameters
//     const ingredients = JSON.parse(req.query.ingredients);
//     // Find all recipes that contain the ingredients
//     const recipes = await RecipeModel.find({
//       ingredients: { $in: ingredients },
//       isPublic: true,
//     });
//     // Send the recipes as the response
//     res.json({ recipes });
//   } catch (err) {
//     console.log("error", err);
//     res.status(500).json({ error: err.message });
//   }
// });
//MYCHANGE
router.get("/search-ingredients/:ingredient", async (req, res) => {
  try {
    // Get the ingredient from the URL parameter
    const ingredient = req.params.ingredient;
    // Find all recipes that contain the ingredient
    const recipes = await RecipeModel.find({
      ingredients: ingredient,
      isPublic: true,
    }).lean();
    // Send the recipes as the response
    res.json({ recipes });
  } catch (err) {
    console.log("error", err);
    res.status(500).json({ error: err.message });
  }
});

//SEARCH USERS RECIPES FOR title
router.get("/search-title/:title", async (req, res) => {
  try {
    // Get the title from the URL parameter
    const title = req.params.title;
    // Find all recipes that match the title
    const recipes = await RecipeModel.find({
      title: title,
      isPublic: true,
    });
    // Send the recipes as the response
    res.json({ recipes });
  } catch (err) {
    console.log("error", err);
    res.status(500).json({ error: err.message });
  }
});
router.get("/search-serving-size/:servingSize", async (req, res) => {
  try {
    // Get the serving size from the URL parameter
    const servingSize = req.params.servingSize;
    // Find all recipes that match the serving size
    const recipes = await RecipeModel.find({
      servingSize: servingSize,
      isPublic: true,
    }).lean();
    // Send the recipes as the response
    res.json({ recipes });
  } catch (err) {
    console.log("error", err);
    res.status(500).json({ error: err.message });
  }
});

// Get specific recipe and comments
router.get("comment/:recipeId", async (req, res) => {
  try {
    // const isValid = mongoose.Types.ObjectId.isValid(req.params.recipeId)
    const recipeId = req.params.recipeId;
    const recipe = await RecipeModel.findById(recipeId);
    const comments = await CommentModel.find({
      recipe: recipe,
    });
    const publicRating =
      comments.reduce((total, next) => total + next.userRating, 0) /
      comments.length;
    console.log(publicRating);
    res.json({ recipe, comments, publicRating });
  } catch (err) {
    console.log("error", err);
    res.status(500).json({ error: err.message });
  }
});
router.get("/:recipeId", async (req, res) => {
  try {
    const recipeId = req.params.recipeId;
    const recipe = await RecipeModel.findById(recipeId);
    res.json({ recipe });
  } catch (err) {
    console.log("error", err);
    res.status(500).json({ error: err.message });
  }
});

// route to get recipes by category
router.get("/category/:category", (req, res) => {
  RecipeModel.find({ category: req.params.category }, (err, recipes) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).json(recipes);
    }
  });
});

export default router;
