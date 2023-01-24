import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddRecipe = () => {
  const [formData, setFormData] = useState({
    title: "",
    ingredients: "",
    instructions: "",
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
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
            <option value="Dinner">Dinner</option>
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dessert">Dessert</option>
          </select>
        </div>
        <div>
          <label htmlFor="ingredients">Ingredients</label>
          <input
            type="text"
            name="ingredients"
            value={formData.ingredients}
            onChange={onChange}
            required
          />
        </div>
        <div>
          <label htmlFor="instructions">Instructions</label>
          <input
            type="text"
            name="instructions"
            value={formData.instructions}
            onChange={onChange}
            required
          />
        </div>
        <div>
          <label htmlFor="isPublic">Public</label>
          <input
            type="checkbox"
            name="isPublic"
            value={formData.isPublic}
            onChange={onChange}
          />
        </div>
        <div>
          <label htmlFor="cookingTime">Cooking Time</label>
          <input
            type="text"
            name="cookingTime"
            value={formData.cookingTime}
            onChange={onChange}
            required
          />
        </div>
        <div>
          <label htmlFor="servingSize">Serving Size</label>
          <input
            type="text"
            name="servingSize"
            value={formData.servingSize}
            onChange={onChange}
            required
          />
        </div>
        <div>
          <label htmlFor="rating">Rating</label>
          <input
            type="text"
            name="rating"
            value={formData.rating}
            onChange={onChange}
            required
          />
        </div>
        <div>
          <label htmlFor="vegetarian">Vegetarian</label>
          <input
            type="text"
            name="vegetarian"
            value={formData.vegetarian}
            onChange={onChange}
            required
          />
        </div>
        <input type="submit" value="Add Recipe" />
      </form>
    </div>
  );
};
export default AddRecipe;
