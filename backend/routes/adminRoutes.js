const router = require("express").Router();

const {
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/adminController");

const { adminMiddleware, protect } = require("../middleware/adminMiddleware");

router.post("/", protect, adminMiddleware, createProduct);
router.put("/:id", protect, adminMiddleware, updateProduct);
router.delete("/:id", protect, adminMiddleware, deleteProduct);

module.exports = router;
