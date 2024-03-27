// Importing necessary functions and models
import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

// GET method to retrieve prompts by creator ID from the database
export const GET = async (request, { params }) => {
    try {
        // Establishing a database connection
        await connectToDB();

        // Finding prompts with the specified creator ID and populating the 'creator' field
        const prompts = await Prompt.find({
            creator: params.id
        }).populate('creator');

        // Returning a success response with the retrieved prompts
        return new Response(JSON.stringify(prompts), { status: 200 });
    } catch (error) {
        // Handling errors
        console.log(error);
        return new Response('Failed to fetch from db', { status: 500 });
    }
}
