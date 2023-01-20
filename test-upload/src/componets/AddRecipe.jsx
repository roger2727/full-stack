import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddRecipe = () => {
  const [formData, setFormData] = useState({
    title: "",
    ingredients: "",
    instructions: "",
    cookingTime: "",
    servingSize: "",
    rating: "",
    vegetarian: "",
  });
  const [recipeId, setRecipeId] = useState("");
  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4001/recipe/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
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
