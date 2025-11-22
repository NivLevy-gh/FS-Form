const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send("Backend is running");
});

app.post('/submit', (req, res) => {
    console.log("Received form data:", req.body);
    res.json({ status: "ok", received: req.body });
});

app.listen(5001)