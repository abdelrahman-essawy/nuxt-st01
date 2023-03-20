import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";


async function getUsers() {
    // return await fsPromises.readFile(path.join(process.cwd(), 'data', '../../../../../server/data/users.json'), 'utf-8')
    //     .then((data) => {
    //         return JSON.parse(data);
    //     })

    return await fetch('http://localhost:3000/users.json')
        .then((res) => res.json())
}

const auth = async (username: string, password: string) => {
    const users = await getUsers();
    try {
        const user = users.find((user: any) => user.username === username);

        if (!user) throw new Error("User not found");
        if (user.password !== password) throw new Error("Incorrect password");

        return user;
    }
    catch (err) {
        console.log(err);
    }
}

const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    providers: [
        CredentialsProvider({
            type: "credentials",
            credentials: {},
            authorize(credentials) {
                const { username, password } = credentials as {
                    username: string;
                    password: string;
                };

                return (async () => await auth(username, password))();

            },
        }),
    ],
    pages: {
        signIn: "/signin",
        // error: '/auth/error',
        // signOut: '/auth/signout'
    },
    callbacks: {
        jwt: async ({ token, user }) => {
            user && (token.user = user)
            return token
        },
        session: async ({ session, token }) => {
            session.user = token.user || {}
            return session
        },
    },
};

export default NextAuth(authOptions);


