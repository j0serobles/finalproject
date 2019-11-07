const router         = require("express").Router();
const apiRoutes      = require("./api");

// API Routes
router.use("/api", apiRoutes);

// If no API routes are hit, send to the React router
router.use(function(req, res) {
    res.redirect("/");
});

module.exports = router;
