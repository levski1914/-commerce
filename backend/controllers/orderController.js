const Order = require("../model/Order");

exports.addOrderItem = async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    return res.status(400).json({ message: "No order items" });
  }

  // Валидация на orderItems
  for (const item of orderItems) {
    if (
      !item.product ||
      !item.qty ||
      !item.name ||
      !item.price ||
      !item.image
    ) {
      return res
        .status(400)
        .json({ message: "Missing required fields in orderItems" });
    }
  }

  try {
    const order = new Order({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Получаване на поръчките за текущия потребител
exports.getMyOrders = async (req, res) => {
  const pageSize = 10; // Брой поръчки на страница
  const page = Number(req.query.pageNumber) || 1;

  const count = await Order.countDocuments({ user: req.user._id });
  const orders = await Order.find({ user: req.user._id })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.status(200).json({ orders, page, pages: Math.ceil(count / pageSize) });
};

// Получаване на поръчка по ID
exports.getOrderById = async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (order) {
    // Проверка дали текущият потребител е собственик на поръчката
    if (
      order.user._id.toString() !== req.user._id.toString() &&
      !req.user.isAdmin
    ) {
      return res
        .status(403)
        .json({ message: "Not authorized to view this order" });
    }

    res.status(200).json(order);
  } else {
    res.status(404).json({ message: "Order not found" });
  }
};

exports.getAllOrders = async (req, res) => {
  // console.log("getAllOrders called");
  try {
    const orders = await Order.find({}).populate("user", "name email");
    // console.log("Orders:", orders);
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching all orders:", error.message);
    res.status(500).json({ message: error.message });
  }
};
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body; // Нов статус от клиента
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (status === "delivered") {
      order.isDelivered = true;
      order.deliveredAt = new Date();
    } else if (status === "canceled") {
      order.isDelivered = false;
      order.deliveredAt = null;
    }

    const updatedOrder = await order.save();
    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    await order.deleteOne(); // Изтриваме поръчката
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
