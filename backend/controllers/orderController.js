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
