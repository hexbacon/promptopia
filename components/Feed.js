// Importing necessary dependencies
'use client'
import { useState, useEffect } from 'react'; // Importing useState and useEffect hooks from React
import PromptCard from './PromptCard'; // Importing the PromptCard component

// Defining the PromptCardList component
const PromptCardList = ({ data, handleTagClick }) => {
  // Check if data is an array
  if (!Array.isArray(data)) {
    console.error("Data is not an array:", data);
    return null; // Returning null or an appropriate fallback if data is not an array
  }

  // Rendering a list of PromptCard components for each post in the data array
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <PromptCard
          key={post._id} // Using post ID as the key for each PromptCard component
          post={post} // Passing post data as props to the PromptCard component
          handleTagClick={handleTagClick} // Passing handleTagClick function as props to the PromptCard component
        />
      ))}
    </div>
  );
};

// Defining the Feed component
const Feed = () => {
  // Initializing state variables
  const [searchText, setSearchText] = useState(''); // State variable to store search text
  const [posts, setPosts] = useState([]); // State variable to store posts data
  const [filteredPosts, setFilteredPosts] = useState([]); // State variable to store posts data

  // Function to handle search input change
  const handleSearchChange = (e) => {
    // Implement search functionality here
    e.preventDefault();

    // Get Text from Seach input
    const text = e.target.value;

    // Set text to state variable
    setSearchText(text);
    //TODO: intirate over prompts
    // Filter posts based on search text
    const filtered = posts.filter((post) => {
      let usernames = post.creator.username.toLowerCase(); // Get creator's usernames
      let prompts = post.prompt.toLowerCase(); // Get prompts text
      let tags = post.tag.toLowerCase();
      return prompts.includes(text.toLowerCase()) || usernames.includes(text.toLowerCase()) || tags.includes(text.toLowerCase()); // Check if the prompt contains text or if the text containts the creator's name or tag
    });
    setFilteredPosts(filtered);
  }

  // Fetching posts data on component mount
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt'); // Fetching posts data from the API
      const data = await response.json(); // Parsing the response JSON

      setPosts(data); // Updating state with fetched posts data
    }
    fetchPosts(); // Calling the fetchPosts function
  }, []) // Dependency array to run the effect only on component mount

  // Rendering the Feed component
  return (
    <section className="feed">
      {/* Search input form */}
      <form className="relative w-full flex-center">
        <input
          type='text'
          placeholder='Search for a tag or username'
          value={searchText}
          onChange={handleSearchChange} // Handling input change
          required
          className='search_input peer'
        />
      </form>

      {/* Rendering the PromptCardList component */}
      <PromptCardList
        data={filteredPosts.length !== 0
          ? filteredPosts
          : posts
        } // Passing posts data as props to the PromptCardList component
        handleTagClick={() => { }} // Passing a placeholder function as props to the PromptCardList component
      />

    </section>
  )
}

// Exporting the Feed component as the default export
export default Feed;
