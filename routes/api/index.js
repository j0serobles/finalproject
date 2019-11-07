const router         = require("express").Router();

const deliveryRoutes = require("./deliveries");
const userRoutes     = require("./users");

// Delivery routes
router.use("/delivery", deliveryRoutes);
router.use("/users",    userRoutes);

module.exports = router;