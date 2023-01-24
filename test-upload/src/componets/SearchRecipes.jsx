import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchRecipes.css";
const SearchRecipes = () => {
  const navigate = useNavigate();
  const [showCategoryButtons, setShowCategoryButtons] = useState(false);

  const handleCategoryClick = () => {
    setShowCategoryButtons(!showCategoryButtons);
  };

  const handleCategorySearch = (category) => {
    navigate(`/category/${category}`);
  };

  return (
    <div className="search-group">
      <div className="search-box">
        <h3>Search By</h3>
        <button className="search-btns" onClick={handleCategoryClick}>
          Category
        </button>
        <button
          className="search-btns"
          onClick={() => handleClick("ingredients")}
        >
          Ingredients
        </button>
        <button className="search-btns" onClick={() => handleClick("ratings")}>
          Ratings
        </button>
        <button
          className="search-btns"
          onClick={() => handleClick("vegetarian")}
        >
          Serving size
        </button>
      </div>
      {showCategoryButtons && (
        <div className="category-btns">
          <button
            className="cat-btn"
            onClick={() => handleCategorySearch("Dinner")}
          >
            Dinner
          </button>
          <button
            className="cat-btn"
            onClick={() => handleCategorySearch("Breakfast")}
          >
            Breakfast
          </button>
          <button
            className="cat-btn"
            onClick={() => handleCategorySearch("Dessert")}
          >
            Dessert
          </button>
          <button
            className="cat-btn"
            onClick={() => handleCategorySearch("Lunch")}
          >
            Lunch
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchRecipes;
