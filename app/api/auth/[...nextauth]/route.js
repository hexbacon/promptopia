// Importing necessary modules and functions
import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google';
import { connectToDB } from "@utils/database";
import User from '@models/user';

// Initializing NextAuth handler
const handler = NextAuth({
    // Configuring authentication providers
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    // Configuring callbacks for session and sign-in events
    callbacks: {
        // Callback for session creation
        async session({ session }) {
            // Finding the user in the database based on their email
            const sessionUser = await User.findOne({
                email: session.user.email
            })

            // Assigning the user's MongoDB ObjectId to the session
            session.user.id = sessionUser._id.toString();

            // Returning the modified session object
            return session;
        },

        // Callback for sign-in event
        async signIn({ profile }) {
            try {
                // Establishing a database connection
                await connectToDB();
                
                // Checking if the user already exists in the database
                const userExists = await User.findOne({
                    email: profile.email
                });

                // If the user does not exist, create a new user in the database
                if (!userExists) {
                    await User.create({
                        email: profile.email,
                        username: profile.name.replace(" ", "").toLowerCase(),
                        image: profile.picture
                    });
                }

                // Returning true to indicate successful sign-in
                return true;
            } catch (error) {
                // Handling errors
                console.log(error);
                // Returning false to indicate sign-in failure
                return false;
            }
        }
    },
})

// Exporting the NextAuth handler for GET and POST requests
export { handler as GET, handler as POST };
