const express = require("express");
const errorHandler = require("./Middleware/errorHandler")
const dotenv = require("dotenv").config()

const app = express();

const port = process.env.PORT || 5000;

app.use(express.json()); //Body Parser to accept data from client otherwise undefined, Write parser to pass data stream received from client on server side 

app.use("/api/contacts", require("./routes/contactRoutes"));
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});