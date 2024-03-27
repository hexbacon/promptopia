// Importing necessary dependencies
"use client";
import { useSession } from "next-auth/react"; // Importing useSession hook from next-auth/react
import { useEffect, useState } from "react"; // Importing useEffect and useState hooks from React
import { useRouter } from "next/navigation"; // Importing useRouter hook from next/navigation

// Importing the Profile component
import Profile from "@components/Profile";

// Defining the MyProfile component
const MyProfile = () => {
    // Initializing necessary hooks
    const router = useRouter(); // Getting the router object
    const { data: session } = useSession(); // Using the useSession hook to get the user's session data

    // Initializing state to store user's posts
    const [myPosts, setMyPosts] = useState([]);

    // Fetching user's posts on component mount or when session user id changes
    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`/api/users/${session?.user.id}/posts`); // Fetching user's posts from the API
            const data = await response.json(); // Parsing the response JSON

            setMyPosts(data); // Setting the fetched posts in state
        };

        if (session?.user.id) fetchPosts(); // Fetching posts only if user id is available in the session
    }, [session?.user.id]); // Dependency array to re-run effect when session user id changes

    // Function to handle edit action on a post
    const handleEdit = (post) => {
        router.push(`/update-prompt?id=${post._id}`); // Redirecting to the update prompt page with post id
    };

    // Function to handle delete action on a post
    const handleDelete = async (post) => {
        const hasConfirmed = confirm("Are you sure you want to delete this prompt?"); // Asking for confirmation before deletion

        if (hasConfirmed) {
            try {
                await fetch(`/api/prompt/${post._id.toString()}`, {
                    method: "DELETE", // Sending a DELETE request to delete the post
                });

                const filteredPosts = myPosts.filter((item) => item._id !== post._id); // Filtering out the deleted post from the state

                setMyPosts(filteredPosts); // Updating state with filtered posts
            } catch (error) {
                console.log(error); // Logging any errors that occur during deletion
            }
        }
    };

    // Rendering the Profile component with user's data and action handlers
    return (
        <Profile
            name='My'
            desc='Welcome to your personalized profile page. Share your exceptional prompts and inspire others with the power of your imagination'
            data={myPosts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    );
};

// Exporting the MyProfile component as the default export
export default MyProfile;
