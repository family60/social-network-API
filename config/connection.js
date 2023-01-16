const mongoose = require("mongoose");

//Wrap Mongoose around local connection to MongoDB
mongoose.connect("mongodb://localhost:27017/socialNetworkDB", 
{useNewUrlParser: true, useUnifiedTopology: true,}
);

module.exports = mongoose.connection