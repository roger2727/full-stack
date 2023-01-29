import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserRecipes from "./RecipesList";

const AddImage = () => {
  const [selectedImage, setSelectedImage] = useState();
  const [uploaded, setUploaded] = useState(false);
  const navigate = useNavigate();
  let { recipeId } = useParams();
  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      if (!localStorage.getItem("token")) return;
      const formData = new FormData();
      formData.append("image", selectedImage);
      const response = await fetch(
        `http://localhost:4001/recipes/upload-image/${recipeId}?width=300`,
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (response.ok) {
        navigate(`/${recipeId}`);
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
      <input type="file" onChange={handleImageChange} />
      <button onClick={handleUpload}>Upload</button>
      {uploaded && <UserRecipes />}
    </div>
  );
};

export default AddImage;
