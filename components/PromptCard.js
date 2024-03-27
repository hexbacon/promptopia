// Importing necessary dependencies
"use client";
import { useState } from "react"; // Importing useState hook from React
import Image from "next/image"; // Importing Image component from Next.js
import { useSession } from "next-auth/react"; // Importing useSession hook from next-auth/react
import { usePathname, useRouter } from "next/navigation"; // Importing usePathname and useRouter hooks from next/navigation

// Defining the PromptCard component
const PromptCard = ({ post, handleEdit, handleDelete, handleTagClick }) => {
  // Using the useSession hook to get the user's session data
  const { data: session } = useSession();
  // Using the usePathname hook to get the current pathname
  const pathName = usePathname();
  // Using the useRouter hook to get the router object
  const router = useRouter();

  // Initializing state variable
  const [copied, setCopied] = useState("");

  // Function to handle profile click
  const handleProfileClick = () => {
    // Logging the post details
    console.log(post);

    // Redirecting to the profile page of the post creator
    if (post.creator._id === session?.user.id) return router.push("/profile");
    router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
  };

  // Function to handle copy prompt text
  const handleCopy = () => {
    // Copying the prompt text to clipboard
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    // Resetting copied state after 3 seconds
    setTimeout(() => setCopied(false), 3000);
  };

  // Rendering the PromptCard component
  return (
    <div className='prompt_card'>
      {/* User information section */}
      <div className='flex justify-between items-start gap-5'>
        <div
          className='flex-1 flex justify-start items-center gap-3 cursor-pointer'
          onClick={handleProfileClick}
        >
          {/* User image */}
          <Image
            src={post.creator.image}
            alt='user_image'
            width={40}
            height={40}
            className='rounded-full object-contain'
          />

          <div className='flex flex-col'>
            {/* Username */}
            <h3 className='font-satoshi font-semibold text-gray-900'>
              {post.creator.username}
            </h3>
            {/* User email */}
            <p className='font-inter text-sm text-gray-500'>
              {post.creator.email}
            </p>
          </div>
        </div>

        {/* Copy button */}
        <div className='copy_btn' onClick={handleCopy}>
          <Image
            src={
              copied === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            alt={copied === post.prompt ? "tick_icon" : "copy_icon"}
            width={12}
            height={12}
          />
        </div>
      </div>

      {/* Prompt text */}
      <p className='my-4 font-satoshi text-sm text-gray-700'>{post.prompt}</p>
      {/* Prompt tag */}
      <p
        className='font-inter text-sm blue_gradient cursor-pointer'
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        #{post.tag}
      </p>

      {/* Edit and Delete options */}
      {session?.user.id === post.creator._id && pathName === "/profile" && (
        <div className='mt-5 flex-center gap-4 border-t border-gray-100 pt-3'>
          {/* Edit option */}
          <p
            className='font-inter text-sm green_gradient cursor-pointer'
            onClick={handleEdit}
          >
            Edit
          </p>
          {/* Delete option */}
          <p
            className='font-inter text-sm orange_gradient cursor-pointer'
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

// Exporting the PromptCard component as the default export
export default PromptCard;
