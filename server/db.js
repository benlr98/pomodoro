import mongoose from 'mongoose';

const connectToDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/pomodoro', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Get the name of the database
    const dbName = mongoose.connection.db.databaseName;

    console.log(`Connected to MongoDB: ${dbName}`);
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
  }
};

export default connectToDB;