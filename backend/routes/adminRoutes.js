const router = require("express").Router();

const {
  addOrderItem,
  getMyOrders,
  getOrderById,
} = require("../controllers/orderController");

const { protect } = require("../middleware/adminMiddleware");

router.post("/", protect, addOrderItem); // Създаване на поръчка
router.get("/myorders", protect, getMyOrders); // Поръчките на потребителя
router.get("/:id", protect, getOrderById); // Детайли за конкретна поръчка

module.exports = router;
