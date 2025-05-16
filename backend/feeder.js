import mongoose from "mongoose";
import dotenv from "dotenv";
import data from "./data.json" assert { type: "json" }; // If using ESModules
import { Product } from "./src/models/product.model.js";

dotenv.config();

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Product.deleteMany(); // Optional: clear previous data
    await Product.insertMany(data);
    console.log("Product data inserted successfully!");
  } catch (err) {
    console.error("Error inserting product data:", err);
  } finally {
    mongoose.disconnect();
  }
};

seedProducts();
