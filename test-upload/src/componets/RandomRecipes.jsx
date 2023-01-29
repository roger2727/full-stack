import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./RandomRecipes.css";

const RandomRecipes = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("http://localhost:4001/public/home");
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
          <div className="random-group" key={recipe._id}>
            {recipe.image && (
              <Link to={`/${recipe._id}`}>
                <p className="title">{recipe.title}</p>

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
