const router = require("express").Router();

const {
  addOrderItem,
  getMyOrders,
  getOrderById,
  updateOrderStatus,
  getAllOrders,
  deleteOrder,
} = require("../controllers/orderController");

const { protect, adminMiddleware } = require("../middleware/adminMiddleware");

router.post("/", protect, addOrderItem); // Създаване на поръчка

router.get("/", protect, adminMiddleware, getAllOrders);
router.put("/:id/status", protect, adminMiddleware, updateOrderStatus);

router.delete("/:id", protect, adminMiddleware, deleteOrder);

module.exports = router;
