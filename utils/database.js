// Importing necessary modules from Mongoose
import mongoose from 'mongoose';

// Initializing a variable to track the connection status
let isConnected = false;

// Defining a function to connect to the MongoDB database
export const connectToDB = async () => {
    // Set strictQuery option to true
    mongoose.set('strictQuery', true);

    // If already connected, log a message and return
    if (isConnected) {
        console.log('MongoDB is already connected');
        return;
    }

    try {
        // Connecting to the MongoDB database using the provided URI
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: 'share_prompts', // Specifying the database name
        });
        // Updating the connection status
        isConnected = true;
        console.log("MongoDB is connected");
    } catch (error) {
        // Logging any errors that occur during the connection process
        console.log(error);
    }
};
