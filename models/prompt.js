// Importing Mongoose and necessary modules
import mongoose, { Schema, model, models } from "mongoose";

// Defining the schema for the Prompt entity
const PromptSchema = new Schema({
    creator: {
        type: mongoose.Schema.Types.ObjectId, // Reference to the User who created the prompt
        ref: 'User' // Referring to the 'User' model
    },
    prompt: {
        type: String,
        require: [true, 'Prompt is required'] // Prompt field is required
    },
    tag: {
        type: String,
        require: [true, 'Tag is required'] // Tag field is required
    }
});

// Defining the Prompt model based on the schema
const Prompt = models.Prompt || model('Prompt', PromptSchema);

// Exporting the Prompt model as the default export
export default Prompt;
