const express = require('express');
const app = express();

app.get("/", (req, res) => {
    res.json({
        user: {
            name: "Kyle",
            age: 26,
            hobby: {
                1: "Music",
                2: "Read a book",
                3: "Anime"
            }
        }
    })
})

app.listen(3001)