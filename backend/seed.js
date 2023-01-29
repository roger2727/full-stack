import { UserModel } from ".//models/user.js";
import { RecipeModel } from "./models/recipe.js";
import { CommentModel } from "./models/comment.js";
import { dbClose } from "./db.js";

// Delete all existing users
await UserModel.deleteMany();
console.log("Deleted all users");

// Delete all existing recipes
await RecipeModel.deleteMany();
console.log("Deleted all users");

// Initial users to insert
const users = [
  { email: "user1@example.com", password: "password1", username: "user1" },
  { email: "user2@example.com", password: "password2", username: "user2" },
  { email: "user3@example.com", password: "password3", username: "user3" },
];

// Insert the initial users
await UserModel.insertMany(users);
console.log("Inserted users");

const usersids = await UserModel.find();

const recipes = [
  {
    image:
      "https://res.cloudinary.com/dkpp2nfjo/image/upload/c_scale,r_30,w_300/v1674385504/table-2777180_1920_jrydui.jpg",
    isPublic: true,
    title: "Bacon and Eggs",
    ingredients: ["eggs", "Bacon", "toast", "butter"],
    instructions: ["Dice ingredients", "Fry it up", "plate on toast", "Serve"],
    category: "Breakfast",
    cookingTime: 20,
    servingSize: 4,
    rating: 2,
    vegetarian: false,
    user: String(usersids[0]._id),
  },
  {
    image:
      "https://res.cloudinary.com/dkpp2nfjo/image/upload/c_scale,r_30,w_300/v1674385504/breakfast-g1e4a67e63_1920_adtjg0.jpg",
    isPublic: true,
    title: "Pasta",
    ingredients: ["eggs", "ham", "cream", "pasta", "herbs"],
    instructions: [
      "Cute everything up",
      "Mix together",
      "Cook on heat",
      "Serve",
      "Enjoy!",
    ],
    category: "Dinner",
    cookingTime: 90,
    servingSize: 8,
    rating: 2,
    vegetarian: false,
    user: String(usersids[1]._id),
  },
  {
    image:
      "https://res.cloudinary.com/dkpp2nfjo/image/upload/c_scale,r_30,w_300/v1674385503/macarons-2548827_1920_bwaf9m.jpg",
    isPublic: true,
    title: "Cereal",
    ingredients: ["chocolate", "Milk", "Any toppings"],
    instructions: ["chocolate", "Put milk in", "Add toppings", "Enjoy!"],
    category: "Breakfast",
    cookingTime: 5,
    servingSize: 1,
    rating: 3,
    vegetarian: true,
    user: String(usersids[0]._id),
  },
  {
    image:
      "https://res.cloudinary.com/dkpp2nfjo/image/upload/c_scale,r_30,w_300/v1674385503/cereal-898073_1920_ofhjkf.jpg",
    isPublic: true,
    title: "Cereal",
    ingredients: ["Favourite Cereal", "Milk", "Any toppings"],
    instructions: [
      "Put cereal in bowl",
      "Put milk in",
      "Add toppings",
      "Enjoy!",
    ],
    category: "Breakfast",
    cookingTime: 5,
    servingSize: 1,
    rating: 5,
    vegetarian: true,
    user: String(usersids[0]._id),
  },
  {
    image:
      "https://res.cloudinary.com/dkpp2nfjo/image/upload/c_fill,r_30,w_300/v1674465935/ivan-torres-MQUqbmszGGM-unsplash_oxbh4t.jpg",
    isPublic: true,
    title: "pizza",
    ingredients: ["beef", "sauce", "topping"],
    instructions: ["ring dominos", "pay", "wait", "Enjoy!"],
    category: "Dinner",
    cookingTime: 5,
    servingSize: 1,
    rating: 1,
    vegetarian: true,
    user: String(usersids[0]._id),
  },
  {
    image:
      "https://res.cloudinary.com/dkpp2nfjo/image/upload/c_fill,h_187,r_30,w_300/v1674465935/natasha-bhogal-7sStoaxfJh0-unsplash_snwlzp.jpg",
    isPublic: true,
    title: "nachos",
    ingredients: ["chips", "Milk", "Any toppings"],
    instructions: [
      "Put cereal in bowl",
      "Put milk in",
      "Add toppings",
      "Enjoy!",
    ],
    category: "Dinner",
    cookingTime: 5,
    servingSize: 1,
    rating: 2,
    vegetarian: true,
    user: String(usersids[0]._id),
  },
  {
    image:
      "https://res.cloudinary.com/dkpp2nfjo/image/upload/c_fill,h_187,r_30,w_300/v1674466263/nathan-dumlao-IjovY65WQiE-unsplash_yi5j69.jpg",
    isPublic: true,
    title: "toast",
    ingredients: ["Favourite Cereal", "Milk", "Any toppings"],
    instructions: [
      "Put cereal in bowl",
      "Put milk in",
      "Add toppings",
      "Enjoy!",
    ],
    category: "Breakfast",
    cookingTime: 5,
    servingSize: 1,
    rating: 4,
    vegetarian: true,
    user: String(usersids[0]._id),
  },
  {
    image:
      "https://res.cloudinary.com/dkpp2nfjo/image/upload/c_scale,r_30,w_300/v1674385503/cereal-898073_1920_ofhjkf.jpg",
    isPublic: true,
    title: "Cereal",
    ingredients: ["Favourite Cereal", "Milk", "Any toppings"],
    instructions: [
      "Put cereal in bowl",
      "Put milk in",
      "Add toppings",
      "Enjoy!",
    ],
    category: "Breakfast",
    cookingTime: 5,
    servingSize: 1,
    rating: 3,
    vegetarian: true,
    user: String(usersids[0]._id),
  },
];

await RecipeModel.insertMany(recipes);
console.log("Inserted recipes");

const recipeids = await RecipeModel.find();

const newcomments = [
  {
    title: "WOW",
    commentText: "Best thing ever!",
    user: String(usersids[1]._id),
    userRating: 5,
    recipe: String(recipeids[0]._id),
  },
  {
    title: "Terrible",
    commentText: "Who made this, it does not make sense!",
    user: String(usersids[2]._id),
    userRating: 1,
    recipe: String(recipeids[0]._id),
  },
  {
    title: "Pretty good",
    commentText: "Would give it another try I guess",
    user: String(usersids[0]._id),
    userRating: 3,
    recipe: String(recipeids[2]._id),
  },
];

await CommentModel.insertMany(newcomments);
console.log("Inserted comments");

// Close the MongoDB connection
dbClose();
