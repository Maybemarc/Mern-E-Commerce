import { Product } from "../models/Product_model.js";

export const createProduct = async (req, res) => {
  const {
    name,
    description,
    price,
    discountPercentage,
    stock,
    imageUrl,
    category,
  } = req.body;

  if (!name || !description || !price || !stock || !imageUrl || !category) {
    return res.status(400).json({
      success: false,
      message: "All fields are Required",
    });
  }

  try {
    const product = new Product({
      name,
      description,
      price,
      discountPercentage,
      stock,
      imageUrl,
      category,
    });
    await product.save();
    res.status(201).json({ success: true, product });
  } catch (error) {
    console.log(`Error in creating products :`, error);
    res.status(500).json({ success: false, message: "Internal server Error" });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const content = req.body;

  try {
    const updateProduct = await Product.findOneAndUpdate({ _id: id }, content, {
      new: true,
    });

    if (!updateProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, product: updateProduct });
  } catch (error) {
    console.log(`Error in updating product :`, error);
    res.status(500).json({ success: false, message: "Internal server Error" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findOneAndDelete({ _id: req.params.id });
    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (error) {
    console.log(`Error in Deleting product :`, error);
    res.status(500).json({ success: false, message: "Internal server Error" });
  }
};

export const getAllProducts = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const sortOrder = parseInt(req.query.sort) === 1 ? 1 : -1;
  const reqCategory = req.query.category || "";

  try {
    const products = await Product.aggregate([
      {
        $match: {
          category: { $regex: reqCategory },
        },
      },
      {
        $sort: {
          createdAt: sortOrder,
          _id: sortOrder,
        },
      },
      { $skip: skip },
      { $limit: limit },
    ]);

    const total = await Product.countDocuments({
      category: { $regex: reqCategory },
    });

    res.status(200).json({
      success: true,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      products,
    });
  } catch (error) {
    console.log(`Error in fetching products :`, error);
    res
      .status(500)
      .json({ success: false, message: "Error fetching products" });
  }
};

export const getSingleProduct = async (req, res) => {
  try {
    const find = await Product.findById(req.params.id);
    if (!find) {
      return res.status(404).json({ success: false, message: "No product found" });
    }
    res.status(200).json({ success: true, product: find });
  } catch (error) {
    console.log(`Error in fetching a single product :`, error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
