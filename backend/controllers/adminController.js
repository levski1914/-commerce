const Product = require("../model/Product");

exports.createProduct = async (req, res) => {
  try {
    const { name, image, description, brand, category, price, countInStock } =
      req.body;
    const product = new Product({
      name,
      image,
      description,
      brand,
      category,
      price,
      countInStock,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, image, description, brand, category, price, countInStock } =
      req.body;
    const product = await Product.findById(id);

    if (product) {
      product.name = name || product.name;
      product.image = image || product.image;
      product.description = description || product.description;
      product.brand = brand || product.brand;
      product.category = category || product.category;
      product.price = price || product.price;
      product.countInStock =
        countInStock !== undefined ? countInStock : product.countInStock;

      const updateProduct = await product.save();
      res.json(updateProduct);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    if (product) {
      res.json({ message: "Product deleted successfully" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
