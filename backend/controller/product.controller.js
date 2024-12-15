import Product from '../models/product.model.js';
import asyncHandler from "express-async-handler";

// CREATE PRODUCT
const createProduct = asyncHandler(async (req, res) => {
  const newProduct = new Product(req.body);
  const product = await newProduct.save();

  if (product) {
    res.status(201).json(product);
  } else {
    res.status(400);
    throw new Error("Product can't be created");
  }
});

// UPDATE PRODUCT
const updateProduct = asyncHandler(async (req, res) => {
  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  );

  if (!updatedProduct) {
    res.status(400);
    throw new Error("Product is not updated");
  } else {
    res.status(200).json(updatedProduct);
  }
});

// DELETE PRODUCT
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  } else {
    res.status(200).json({ message: "Product has been deleted!" });
  }
});

// GET SINGLE PRODUCT
const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  } else {
    res.status(200).json(product);
  }
});

// GET ALL PRODUCTS
const getAllProducts = asyncHandler(async (req, res) => {
  const { new: qNew, category: qCategory, search: qSearch } = req.query;

  let products;

  if (qNew) {
    products = await Product.find().sort({ createdAt: -1 });
  } else if (qCategory) {
    products = await Product.find({ categories: { $in: [qCategory] } });
  } else if (qSearch) {
    products = await Product.find({
      $text: { $search: qSearch },
    });
  } else {
    products = await Product.find().sort({ createdAt: -1 });
  }

  res.status(200).json(products);
});

// RATING A PRODUCT
const ratingProduct = asyncHandler(async (req, res) => {
  const { star, name, comment, postedBy } = req.body;

  if (star) {
    await Product.findByIdAndUpdate(
      req.params.productId,
      { $push: { ratings: { star, name, comment, postedBy } } },
      { new: true }
    );
    res.status(201).json({ message: "Product was rated successfully" });
  } else {
    res.status(400);
    throw new Error("Product was not rated successfully");
  }
});

export {
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getAllProducts,
  ratingProduct,
};
