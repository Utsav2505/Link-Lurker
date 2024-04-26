import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { connectToDB } from '@utils/database';
import User from '@models/user';

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        async session({session, token}) {
            const sessionUser = await User.findOne({ email: session.user.email });
            session.user.id = sessionUser._id.toString();
            console.log("logged in ", { sessionUser });
            return session;
          }, 
        async signIn({profile,account}){
            try{
                await connectToDB();
                let userExists = await User.findOne({email: profile.email});
                if(!userExists){
                    userExists = await User({
                        email: profile.email,
                        name: profile.name,
                        image: profile.picture,
                        // accessToken: account.accessToken,
                    }).save();
                }
                // console.log("user exists",{userExists});
                return userExists;
            }catch(error){
                console.log({error});
                return false;
            }
        }
    },
    
});

export {handler as GET, handler as POST};