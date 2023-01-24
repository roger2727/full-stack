import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./RandomRecipes.css";

const RandomRecipes = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("http://localhost:4001/recipes/home");
      const data = await res.json();
      setRecipes(data);
    }
    fetchData();
  }, []);

  return (
    <div className="random-component">
      <h2>Top Picks</h2>
      <div className="random-recipes">
        {recipes.map((recipe) => (
          <div key={recipe._id}>
            {recipe.image && (
              <Link to={`/public/recipes/${recipe._id}`}>
                <img
                  className="recipe-image"
                  src={recipe.image}
                  alt={recipe.title}
                />
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RandomRecipes;
