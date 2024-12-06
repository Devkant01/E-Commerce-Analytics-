const express = require('express');
const cors = require('cors');
require("dotenv").config(); //this should be at top
const { Router } = require("./routes/index");
// require("./model/connect");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use("/api/v1", Router);


app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get("*", (req, res) => {
    res.send("404! Page not found");
})

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
    