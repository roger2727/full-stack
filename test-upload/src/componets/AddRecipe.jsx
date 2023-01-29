import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "./Nav";
import "./AddRecipe.css";

const AddRecipe = () => {
  const [formData, setFormData] = useState({
    title: "",
    ingredients: [],
    instructions: [],
    category: "",

    cookingTime: "",
    servingSize: "",
    rating: "",
    vegetarian: "",
    isPublic: false,

    comments: [],
  });
  const [recipeId, setRecipeId] = useState("");
  const navigate = useNavigate();

  const onChange = (e) => {
    if (e.target.name === "ingredients" || e.target.name === "instructions") {
      const value = e.target.value;
      setFormData({
        ...formData,
        [e.target.name]: value.split("\n"),
      });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4001/recipes/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          ...formData,
          createdAt: new Date(),
        }),
      });
      if (response.ok) {
        const json = await response.json();
        setRecipeId(json.recipe._id);
        navigate(`/upload-image/${json.recipe._id}`);
      } else {
        const error = await response.json();
        console.error(error);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <Nav />
      <div className="form-box">
        <h1>Add Recipe</h1>
        <form onSubmit={onSubmit}>
          <div>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={onChange}
              required
            />
          </div>
          <div>
            <label htmlFor="category">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={onChange}
              required
            >
              <option value="">Select a category</option>
              <option value="Dinner">Dinner</option>
              <option value="Breakfast">Breakfast</option>
              <option value="Lunch">Lunch</option>
              <option value="Dessert">Dessert</option>
            </select>
          </div>
          <div>
            <label htmlFor="ingredients">Ingredients</label>
            <textarea
              name="ingredients"
              value={formData.ingredients.join("\n")}
              onChange={onChange}
              required
              placeholder="Example: 
salt
chciken
salad"
            />
          </div>
          <div>
            <label htmlFor="instructions">Instructions</label>
            <textarea
              name="instructions"
              value={formData.instructions.join("\n")}
              onChange={onChange}
              required
              placeholder="Example: 
Preheat oven to 350°F.
In a large bowl, combine flour, sugar, and baking powder.
Add in the butter, eggs, and milk. Mix until well combined."
            />
          </div>
          <div>
            <label htmlFor="cookingTime">Cooking Time (minutes)</label>
            <input
              type="number"
              name="cookingTime"
              value={formData.cookingTime}
              onChange={onChange}
              min="10"
              max="200"
              step="10"
              required
            />
          </div>
          <div>
            <label htmlFor="servingSize">Serving Size</label>
            <input
              type="number"
              name="servingSize"
              value={formData.servingSize}
              onChange={onChange}
              required
              min="1"
              max="10"
            />
          </div>
          <div>
            <label htmlFor="rating">Rating (out of 5)</label>
            <input
              type="number"
              name="rating"
              min="0"
              max="5"
              value={formData.rating}
              onChange={onChange}
              required
            />
          </div>

          <button type="submit">Add Recipe</button>
        </form>
      </div>
    </div>
  );
};
export default AddRecipe;
