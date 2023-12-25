const express = require("express");
const app = express();

const cors = require('cors')

app.use(cors({
    origin: 'http://locahost:5500',
    methods: ["GET", "POST"]
}))

app.get("/data", (req, res) => {
    res.json({
        name: 'Kyle',
        favoriteFood: "Rice"
    })
})

app.listen(3001)