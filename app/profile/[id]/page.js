'use client'
import { useEffect, useState } from "react";
import Profile from "@components/Profile";

const UserProfile = ({ params }) => {
    const [userPosts, setUserPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`/api/users/${params.id}/posts`);
            const data = await response.json();
            setUserPosts(data);
        };

        fetchPosts();
    }, [params.id]);

    // Check if userPosts contains any items before accessing its properties
    const username = userPosts.length > 0 ? userPosts[0].creator.username : '';

    return(
        <Profile
            name={username}
            desc={`Welcome to ${username} personalized profile page. Share your exceptional prompts and inspire others with the power of your imagination`}
            data={userPosts}
            handleEdit={() => {}}
            handleDelete={() => {}}
        />
    );
}

export default UserProfile;
