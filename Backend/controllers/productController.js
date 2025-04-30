import { Product } from "../Models/Product_model.js";

export const createProduct = async (req, res) => {
  const { name, description, price, stock, imageUrl, category } = req.body;

  if (!name || !description || !price || !stock || !imageUrl || !category) {
    res
      .status(400)
      .json({ success: false, message: "All fields are Required" });
  }

  try {
    const product = new Product({
      name,
      description,
      price,
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
  const content = req.body;

  try {
    const updateProduct = await Product.findOneAndUpdate(
      req.params.id,
      content,
      { new: true }
    );
    res.status(200).json({ success: true, product: updateProduct });
  } catch (error) {
    console.log(`Error in updating product :`, error);
    res.status(500).json({ success: false, message: "Internal server Error" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    await Product.findOneAndDelete(req.params.id);
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
      res.status(404).json({ success: false, message: "No product found" });
    }
    res.status(200).json({ success: true, product: find });
  } catch (error) {
    console.log(`Error in fetching a single product :`, error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
