// Importing the Feed component
import Feed from "../components/Feed";

// Defining the Home component
const Home = () => {
    // Rendering the component
    return (
        <section className="w-full flex-center flex-col">
            {/* Heading section */}
            <h1 className="head_text text-center">
                Discover & Share
                <br className="max-md:hidden" />
                {/* Highlighting AI-Powered Prompts */}
                <span className="orange_gradient text-center">AI-Powered Prompts</span>
            </h1>
            {/* Description section */}
            <p className="desc text-center">Promptopia is an open-source AI Prompting tool 
                for the modern world to discover, create, and share 
                creative prompts.
            </p>
            {/* Rendering the Feed component */}
            <Feed />
        </section>
    );
}

// Exporting the Home component as the default export
export default Home;
