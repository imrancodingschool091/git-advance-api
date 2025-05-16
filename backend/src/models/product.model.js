import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: {
    type: String,
    enum: [
      'Electronics', 'Fashion', 'Grocery', 'Books',
      'Furniture', 'Toys', 'Beauty', 'Sports',
      'Automobile', 'Stationery'
    ],
    required: true
  },
  price: { type: Number, required: true },
  details: { type: String },
 
});

 export const Product = mongoose.model('Product', productSchema);


