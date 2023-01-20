import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const UserRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const { userId } = useParams();

  useEffect(() => {
    const getRecipes = async () => {
      try {
        const response = await fetch("http://localhost:4001/recipe/all", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        const data = await response.json();
        setRecipes(data.recipes);
      } catch (err) {
        console.error(err);
      }
    };
    getRecipes();
  }, []);

  return (
    <div>
      {recipes.map((recipe) => (
        <div key={recipe._id}>
          <h2>{recipe.title}</h2>
          <img src={recipe.image} alt={recipe.title} />
          <p>{recipe.ingredients}</p>
          <p>{recipe.instructions}</p>
        </div>
      ))}
    </div>
  );
};

export default UserRecipes;
