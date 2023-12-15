const express = require("express");
const multer = require('multer');
const path = require("path")

const app = express();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images'); // Set a upload direction
    },

    filename: (req, file, cb) => {
        console.log(file);

        cb(null, Date.now()); // Set a file name
    }
})
const upload = multer({storage: storage})

app.set("view engine", "ejs");

app.get("/upload", (req, res) => {
    res.render("upload");
});

app.post("/upload", upload.single('image'), (req, res) => {
    res.send("Image Uploader");
});

app.listen(3001);
console.log("3001 is the port")