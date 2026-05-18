const mongoose = require("mongoose");

const connectDB = async () => {
  const uri = process.env.MONGO_URI;

  // If no valid URI is provided, allow running in development without DB.
  if (
    !uri ||
    uri.startsWith("replace_with") ||
    (!uri.startsWith("mongodb://") && !uri.startsWith("mongodb+srv://"))
  ) {
    const msg = "MongoDB connection string missing or invalid.";
    if (process.env.NODE_ENV === "development") {
      console.warn(`⚠️ ${msg} Skipping DB connect in development.`);
      return;
    }
    console.error(`❌ ${msg}`);
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(uri);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    if (process.env.NODE_ENV === "development") {
      console.warn("Continuing without DB connection in development.");
      return;
    }
    process.exit(1);
  }
};

module.exports = connectDB;
