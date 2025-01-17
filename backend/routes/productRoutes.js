const router = require("express").Router();

const {
  allProducts,
  getProductDetails,
} = require("../controllers/productController");

router.get("/", allProducts);
router.get("/:id", getProductDetails);
module.exports = router;
