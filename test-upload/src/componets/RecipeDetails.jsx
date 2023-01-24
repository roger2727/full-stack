import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState({});

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`http://localhost:4001/recipes/${id}`);
      const data = await res.json();
      setRecipe(data);
    }
    fetchData();
  }, [id]);

  return (
    <div className="recipe-details">
      <h2>{recipe.title}</h2>
      <div className="recipe-image">
        <img src={recipe.image} alt={recipe.title} />
      </div>
      <div className="recipe-info">
        <p>Ingredients:</p>
        <ul>
          {recipe.ingredients &&
            recipe.ingredients.map((ingredient) => (
              <li key={ingredient}>{ingredient}</li>
            ))}
        </ul>
        <p>Instructions:</p>
        <ol>
          {recipe.instructions &&
            recipe.instructions.map((instruction) => (
              <li key={instruction}>{instruction}</li>
            ))}
        </ol>
        <p>Category: {recipe.category}</p>
        <p>Cooking Time: {recipe.cookingTime} minutes</p>
        <p>Serving Size: {recipe.servingSize}</p>
        <p>Rating: {recipe.rating}/10</p>
        <p>Vegetarian: {recipe.vegetarian ? "Yes" : "No"}</p>
      </div>
    </div>
  );
};

export default RecipeDetails;
