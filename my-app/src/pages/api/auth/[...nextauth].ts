import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Helper function to get the list of users from the server
async function getUsers() {
    try {
        const response = await fetch('http://localhost:3000/users.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
        return [];
    }
}

// Authenticates the user based on the given username and password
async function authenticate(username: string, password: string) {
    const users = await getUsers();
    return users.find((user: any) => user.username === username && user.password === password);
}

// Configuration options for NextAuth
const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    providers: [
        CredentialsProvider({
            type: "credentials",
            credentials: {},
            async authorize(credentials) {
                const { username, password } = credentials as { username: string, password: string };
                const user = await authenticate(username, password);
                if (!user) {
                    throw new Error('Wrong credentials. Try again.');
                }
                return user;
            },
        }),
    ],
    pages: {
        signIn: "/signin",
        // error: '/error',
        // signOut: '/signout'
    },
    callbacks: {
        jwt: async ({ token, user }) => {
            if (user) {
                token.user = user;
            }
            return token;
        },
        session: async ({ session, token }) => {
            session.user = token.user || {};
            return session;
        },
    },
};

export default NextAuth(authOptions);
