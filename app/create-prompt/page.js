// Importing necessary dependencies
'use client'
import { useState } from 'react'; // Importing useState hook from React
import { useSession } from 'next-auth/react'; // Importing useSession hook from next-auth/react
import { useRouter } from 'next/navigation'; // Importing useRouter hook from next/navigation
import { Form } from '@components/Form'; // Importing the Form component

// Defining the CreatePrompt component
const CreatePrompt = () => {
    // Initializing state variables
    const [submitting, setSubmitting] = useState(false); // State variable to track form submission status
    const [post, setPost] = useState({ // State variable to store prompt details
        prompt: '',
        tag: '',
    });
    const router = useRouter(); // Getting the router object
    const { data: session } = useSession(); // Using the useSession hook to get the user's session data

    // Function to handle prompt creation
    const createPrompt = async (event) => {
        event.preventDefault(); // Preventing default form submission behavior

        setSubmitting(true); // Setting submitting state to true to indicate form submission in progress
        try {
            // Sending a POST request to create a new prompt
            const response = await fetch('/api/prompt/new', {
                method: 'POST',
                body: JSON.stringify({
                    prompt: post.prompt,
                    userId: session?.user.id, // Adding user id to the request payload
                    tag: post.tag
                })
            });
            if (response.ok) {
                router.push('/'); // Redirecting to the homepage if prompt creation is successful
            }
        } catch (error) {
            console.log(error); // Logging any errors that occur during prompt creation
        } finally {
            setSubmitting(false); // Resetting submitting state to false after form submission completes
        }
    };

    // Rendering the Form component with appropriate props
    return (
        <Form
            type="Create" // Passing the type of form ('Create')
            post={post} // Passing the post object
            setPost={setPost} // Passing the function to update the post object
            submitting={submitting} // Passing the submitting state
            handleSubmit={createPrompt} // Passing the function to handle form submission
        />
    );
};

// Exporting the CreatePrompt component as the default export
export default CreatePrompt;
