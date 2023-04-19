require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT //5000

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static('src'));

mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Successful connection to Databse'))
.catch((err) => console.log(err));

app.get("/", function(req, res) {
    res.sendFile("C:/Users/Marsel/Desktop/mevn/server/src/index.php");
});
app.use("/fetch/", require("./routes/routes"));

app.listen(port, () => console.log("Server running at 5000"));