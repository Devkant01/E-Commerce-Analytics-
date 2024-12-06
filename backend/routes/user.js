const express = require('express');
const { allTransactions } = require("../controller/allTransactions");
const { monthlyStatistics } = require("../controller/monthlyStatistics");
const { priceRange } = require("../controller/priceRange");
const { allCategories } = require("../controller/allCategories");
const { handler } = require("../controller/handler");

const router = express.Router();

router.get("/", (req, res) => {
    res.send("hey user! good to see you");
})

router.get("/allTransactions", allTransactions);
router.get("/monthlyStats", monthlyStatistics);
router.get("/priceRange", priceRange);
router.get("/allCategories", allCategories);
router.get("/handler", handler);

module.exports = router;