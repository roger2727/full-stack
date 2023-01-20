import { dbClose } from "./db.js";
import { UserModel } from ".//models/user.js";
import { RecipeModel } from ".//models/recipe.js";
// Delete all existing users
await UserModel.deleteMany();
console.log("Deleted all users");
await RecipeModel.deleteMany();
console.log("Deleted all recipes");

// Initial users to insert
const users = [
  { email: "user1@example.com", password: "password1", username: "user1" },
  { email: "user2@example.com", password: "password2", username: "user2" },
  { email: "user3@example.com", password: "password3", username: "user3" },
];

// Insert the initial users
await UserModel.insertMany(users);
console.log("Inserted users");

// Close the MongoDB connection
dbClose();
