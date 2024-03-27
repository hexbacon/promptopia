// Importing necessary modules from Mongoose
import { Schema, model, models } from 'mongoose';

// Create a new schema for the user
const UserScheme = new Schema({
    // Email must be unique and required
    email: {
        type: String,
        unique: [true, 'Email already exists'], // Ensuring email uniqueness
        required: [true, 'Email is required'], // Email field is required
    },
    // Username required and must match regex
    username: {
        type: String,
        required: [true, 'Username is required'], // Username field is required
        match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username is invalid. It should contain 8-20 alphanumeric characters and be unique."] // Regex pattern for username validation
    },
    image: {
        type: String, // Image field is of type string
    }
});

// Defining the User model based on the schema
const User = models.User || model("User", UserScheme);

// Exporting the User model as the default export
export default User;
