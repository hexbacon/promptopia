// Importing necessary functions and models
import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

// GET method to retrieve a prompt by its ID
export const GET = async (request, { params }) => {
    try {
        // Establishing a database connection
        await connectToDB();
        
        // Finding the prompt by its ID and populating the 'creator' field
        const prompt = await Prompt.findById(params.id).populate('creator');

        // Handling the case where the prompt is not found
        if (!prompt) return new Response("Prompt not found", { status: 404 });

        // Returning the found prompt
        return new Response(JSON.stringify(prompt), { status: 200 });
    } catch (error) {
        // Handling errors
        console.log(error);
        return new Response('Failed to fetch prompt', { status: 500 });
    }
}

// PATCH method to update a prompt by its ID
export const PATCH = async (request, { params }) => {
    // Extracting prompt and tag from the request body
    const { prompt, tag } = await request.json();
    try {
        // Establishing a database connection
        await connectToDB();

        // Finding the existing prompt by its ID
        const existingPrompt = await Prompt.findById(params.id);

        // Handling the case where the prompt is not found
        if (!prompt) return new Response("Prompt not found", { status: 404 });

        // Updating the prompt fields
        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;

        // Saving the updated prompt
        await existingPrompt.save();
        
        // Returning a success response
        return new Response(JSON.stringify(existingPrompt), { status: 200 });
    } catch (error) {
        // Handling errors
        console.log(error);
        return new Response('Failed to update the prompt', { status: 500 });
    }
}

// DELETE method to delete a prompt by its ID
export const DELETE = async(request, {params}) => {
    try {
        // Establishing a database connection
        await connectToDB();

        // Finding and deleting the prompt by its ID
        await Prompt.findByIdAndDelete(params.id);
        
        // Returning a success response
        return new Response("Prompt deleted successfully", {status: 200});
    } catch (error) {
        // Handling errors
        console.log(error);
        return new Response("Failed to delete the prompt", {status: 500});
    }
}
