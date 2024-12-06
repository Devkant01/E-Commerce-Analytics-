const express = require('express');
const {fetchData} = require("../controller/fetchData");

const router = express.Router();

router.get("/", (req, res) => {
    res.send("hey boss! how are you");
})
router.get("/fetchData", fetchData);


module.exports = router;