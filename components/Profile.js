// Importing the PromptCard component
import PromptCard from "./PromptCard";

// Defining the Profile component
const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  // Rendering the Profile component
  return (
    <section className='w-full'>
      {/* Profile Title */}
      <h1 className='head_text text-left'>
        {/* Dynamic profile name with gradient */}
        <span className='blue_gradient'>{name} Profile</span>
      </h1>
      {/* Profile Description */}
      <p className='desc text-left'>{desc}</p>

      {/* Displaying user's prompts */}
      <div className='mt-10 prompt_layout'>
        {/* Mapping through user's data to render each prompt */}
        {data.map((post) => (
          <PromptCard
            key={post._id} // Unique key for each PromptCard component
            post={post} // Passing prompt data as props to the PromptCard component
            handleEdit={() => handleEdit && handleEdit(post)} // Passing handleEdit function as props to the PromptCard component
            handleDelete={() => handleDelete && handleDelete(post)} // Passing handleDelete function as props to the PromptCard component
          />
        ))}
      </div>
    </section>
  );
};

// Exporting the Profile component as the default export
export default Profile;
