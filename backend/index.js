const express = require("express");
const cors = require("cors");
const mainRouter = require("./routes/index")
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(
    "mongodb+srv://raviraj:Raviraj1234567@cluster0.thdnm.mongodb.net/paytm",
    { useNewUrlParser: true, useUnifiedTopology: true }
).then(() => {
    console.log("Connected to MongoDB");
}).catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
});

app.use("/api/v1", mainRouter);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
