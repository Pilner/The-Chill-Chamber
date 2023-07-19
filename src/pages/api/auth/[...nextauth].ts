import CredentialsProvider from 'next-auth/providers/credentials';
import NextAuth, { NextAuthOptions } from 'next-auth';
import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../../../db';

const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
		  try {
			  const { username, password } = credentials || {}; // Use type assertion or check for undefined
			  
        if (!username || !password) {
          // Invalid credentials, authentication failed
          return null;
        }

        // Perform custom authentication logic
        const userExists = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

        if (userExists.rowCount === 0) {
          // User does not exist, authentication failed
    
          return null;
        } else {
          const user = userExists.rows[0];
          const passwordMatch = await bcrypt.compare(password, user.password_hash);
    
          if (!passwordMatch) {
          // Password does not match, authentication failed
          return null;
          }
    
          // Authentication successful, return the user object
          return {
            id: user.user_id,
            username: user.username,
            access_token: user.access_token
          };
        }

      } catch (error) {
          console.error('Authentication error:', error);
          return null;
      }
      },
    }),
  ],
  secret: process.env.SECRET,
  session: {
    strategy: 'jwt',
  },
  debug: process.env.NODE_ENV === 'development',
  pages: {
	signIn: '/login',
  },
  callbacks: {
    async session({ session, token, user }) {
      session.user = token.user;
      session.user.id = token.id;
      session.access_token = token.access_token;
      return session;
    },
    async jwt({ token, user, account, profile }) {
      if (account?.access_token) {
        token.access_token = user.access_token;
      }
      if (user) {
        token.user = user;
      }
      return token;
    }
  }
};

const handler = NextAuth(options);
const Output = (req: NextApiRequest, res: NextApiResponse) => NextAuth(req, res, options)

export default Output;
