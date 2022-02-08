const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log(`DB Connected: ${connection.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error}`);
    process.exit();
  }
};

module.exports = connectDB;
