import { AutoEncryptionLoggerLevel } from "mongodb";
import Product from "../models/product.model";
import expressAsyncHandler from "express-async-handler";

const createProduct = asyncHandler(async (req, res) => {
  const newProduct = await Product(req.body);
  const product = newProduct.save();

  if (product) {
    res.status(201).json(product);
  } else {
    res.status(400);
    throw new Error("Product can't be created");
  }
});

const updateProduct = asyncHandler(async (req, res) => {
  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    { new: true }
  );

  if (!updateProduct) {
    res.status(400);
    throw new Error("Product is not updated");
  } else {
    res.status(201).json(updatedProduct);
  }
});

const deleteProduct = asyncHandler(async () => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  } else {
    res.status(200).json("Product has been deleted!");
  }
});

const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  } else {
    res.status(200).json(product);
  }
});

const getAllProducts = asyncHandler(async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  const qSearch = req.query.search;

  let products;

  if (qNew) {
    products = await Product.find().sort({ createdAt: -1 });
  } else if (qCategory) {
    products = await Product.find({ categories: { $in: [qCategory] } });
  } else if (qSearch) {
    products = await Product.find({
      $text: {
        $search: qSearch,
        $caseSensitive: false,
        $diacriticSensitive: false,
      },
    });
  } else {
    products = await Product.find().sort({ createdAt: -1 });
  }

  res.status(200).json(products);
});

const ratingProduct = asyncHandler(async (req, res) => {
  const { star, name, comment, postedBy } = req.body;
  if (star) {
    const postedRating = await Product.findByIdAndUpdate(
      req.params.productId,
      { $push: { ratings: { star, name, comment, postedBy } } },
      { new: true }
    );
    res.status(201).json("Product was rated successfully");
  } else {
    res.status(400);
    throw new Error("Product was not rated successfully");
  }
});

export {
  ratingProduct,
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
