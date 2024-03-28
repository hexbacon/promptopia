// Importing necessary functions and models
import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

// POST method to create a new prompt
export const POST = async(req, res) => {
    // Destructuring required data from the request body
    const { userId, prompt, tag } = await req.json();

    try {
        // Establishing a database connection
        await connectToDB();
        
        // Creating a new prompt instance
        const newPrompt = new Prompt({
            creator: userId, 
            prompt,
            tag
        });

        // Saving the new prompt to the database
        await newPrompt.save();

        // Returning a success response with the created prompt
        return new Response(JSON.stringify(newPrompt), {status: 201})
    } catch (error) {
        // Handling errors
        console.log(error);
        // Returning an error response
        return new Response('Failed to create a new prompt', {status: 500});
    }
}
