const router = require("express").Router();
const deliveryController = require("../../controllers/deliveryController");

// Matches with "/api/delivery" because of -- router.use("/delivery", deliveryRoutes); -- line in index.js
router
  .route("/")
  .get(deliveryController.findAll)
  .post(deliveryController.create);

// Matches with "/api/delivery/:id"
router
  .route("/:id")
  .get(deliveryController.findById)
  .put(deliveryController.update)
  .delete(deliveryController.remove);

// Matches with "/api/delivery/status/:status"
router
.route("/status/:status")
.get(deliveryController.findByStatus);


module.exports = router;
