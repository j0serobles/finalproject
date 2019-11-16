const router         = require("express").Router();

const deliveryRoutes = require("./deliveries");
const userRoutes     = require("./users");
const mapRoutes      = require("./maps.js"); 

// Delivery routes
router.use("/delivery", deliveryRoutes);
router.use("/users",    userRoutes);
router.use("/maps",      mapRoutes);

module.exports = router;