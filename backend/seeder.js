const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./model/Product");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const products = [
  {
    name: "Product 1",
    image: "https://via.placeholder.com/150",
    description: "This is product 1",
    brand: "Brand A",
    category: "Category A",
    price: 99.99,
    countInStock: 10,
  },
  {
    name: "Product 2",
    image: "https://via.placeholder.com/150",
    description: "This is product 2",
    brand: "Brand B",
    category: "Category B",
    price: 49.99,
    countInStock: 20,
  },
];

const seedProducts = async () => {
  try {
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log("Products seeded successfully");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedProducts();
