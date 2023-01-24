import { Routes, Route, BrowserRouter } from "react-router-dom";
import Register from "./componets/Register";
import Login from "./componets/Login";
import AddRecipe from "./componets/AddRecipe";
import AddImage from "./componets/AddImage";
import UserRecipes from "./componets/RecipesList";
import Home from "./componets/Home";
import RecipeDetails from "./componets/RecipeDetails";
import RecipeCategory from "./componets/RecipeCategory";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="category/:category" element={<RecipeCategory />} />
        <Route path="login" element={<Login />} />
        <Route path="/public/recipes/:id" element={<RecipeDetails />} />
        <Route path="/" element={<Home />} />
        <Route path="all" element={<UserRecipes />} />
        <Route path="upload-image/:recipeId" element={<AddImage />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="AddRecipe" element={<AddRecipe />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
