import { Product } from "../models/product.model.js";

export const getProducts = async (req, res) => {
  try {
    let { search } = req.query;
    let page = req.query.page || 1;
    let limit = req.query.limit || 10;
    let skip = (page - 1) * limit;

    
    let query = {};

    if (search) {
      if (!isNaN(search) && search.length <= 7) {
        
        query.price = Number(search);
      } else {
        query.name = { $regex: search, $options: "i" };
      }
    }

    let products = await Product.find(query).skip(skip).limit(limit);

    res.status(200).json({ sucess: true, products, nbHits: products.length });
  } catch (error) {
    res.status(500).json({ sucess: false, message: error.message });
  }
};
