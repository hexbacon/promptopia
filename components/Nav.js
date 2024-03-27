// Importing necessary dependencies
"use client";
import Link from "next/link"; // Importing Link component from Next.js
import Image from "next/image"; // Importing Image component from Next.js
import { useEffect, useState } from "react"; // Importing useEffect and useState hooks from React
import { signIn, signOut, useSession, getProviders } from "next-auth/react"; // Importing signIn, signOut, useSession, and getProviders functions from next-auth/react

// Defining the Nav component
const Nav = () => {
    // Using the useSession hook to get the user's session data
    const { data: session } = useSession();

    // Initializing state variables
    const [providers, setProviders] = useState(null); // State variable to store authentication providers
    const [toggleDropdown, setToggleDropdown] = useState(false); // State variable to toggle mobile dropdown menu

    // Fetching authentication providers on component mount
    useEffect(() => {
        (async () => {
            const res = await getProviders(); // Fetching authentication providers
            setProviders(res); // Setting authentication providers in state
        })();
    }, []); // Dependency array to run the effect only on component mount

    // Rendering the navigation component
    return (
        <nav className='flex-between w-full mb-16 pt-3'>
            {/* Logo */}
            <Link href='/' className='flex gap-2 flex-center'>
                {/* Promptopia Logo */}
                <Image
                    src='/assets/images/logo.svg'
                    alt='logo'
                    width={30}
                    height={30}
                    className='object-contain'
                />
                <p className='logo_text'>Promptopia</p>
            </Link>

            {/* Desktop Navigation */}
            <div className='sm:flex hidden'>
                {/* If user is in session */}
                {session?.user ? (
                    <div className='flex gap-3 md:gap-5'>
                        {/* Create Post Link */}
                        <Link href='/create-prompt' className='black_btn'>
                            Create Post
                        </Link>
                        {/* Sign Out Button */}
                        <button type='button' onClick={signOut} className='outline_btn'>
                            Sign Out
                        </button>
                        {/* Profile Link */}
                        <Link href='/profile'>
                            <Image
                                src={session?.user.image}
                                width={37}
                                height={37}
                                className='rounded-full'
                                alt='profile'
                            />
                        </Link>
                    </div>
                ) : (
                    <>
                        {/* Otherwise, if user is not in session, render sign-in buttons */}
                        {providers &&
                            Object.values(providers).map((provider) => (
                                <button
                                    type='button'
                                    key={provider.name}
                                    onClick={() => {
                                        signIn(provider.id);
                                    }}
                                    className='black_btn'
                                >
                                    Sign in
                                </button>
                            ))}
                    </>
                )}
            </div>

            {/* Mobile Navigation */}
            <div className='sm:hidden flex relative'>
                {/* If user is in session */}
                {session?.user ? (
                    <div className='flex'>
                        {/* Profile Image */}
                        <Image
                            src={session?.user.image}
                            width={37}
                            height={37}
                            className='rounded-full'
                            alt='profile'
                            onClick={() => setToggleDropdown(!toggleDropdown)}
                        />

                        {/* Mobile Dropdown Menu */}
                        {toggleDropdown && (
                            <div className='dropdown'>
                                {/* My Profile Link */}
                                <Link
                                    href='/profile'
                                    className='dropdown_link'
                                    onClick={() => setToggleDropdown(false)}
                                >
                                    My Profile
                                </Link>
                                {/* Create Prompt Link */}
                                <Link
                                    href='/create-prompt'
                                    className='dropdown_link'
                                    onClick={() => setToggleDropdown(false)}
                                >
                                    Create Prompt
                                </Link>
                                {/* Sign Out Button */}
                                <button
                                    type='button'
                                    onClick={() => {
                                        setToggleDropdown(false);
                                        signOut();
                                    }}
                                    className='mt-5 w-full black_btn'
                                >
                                    Sign Out
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <>
                        {/* Otherwise, if user is not in session, render sign-in buttons */}
                        {providers &&
                            Object.values(providers).map((provider) => (
                                <button
                                    type='button'
                                    key={provider.name}
                                    onClick={() => {
                                        signIn(provider.id);
                                    }}
                                    className='black_btn'
                                >
                                    Sign in
                                </button>
                            ))}
                    </>
                )}
            </div>
        </nav>
    );
};

// Exporting the Nav component as the default export
export default Nav;
