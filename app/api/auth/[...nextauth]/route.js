import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { supabase } from '@/utils/supabase';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account.provider === 'google') {
        try {
          // Check if user exists
          const { data: existingUser } = await supabase
            .from('users')
            .select()
            .eq('email', user.email)
            .single();

          if (!existingUser) {
            // Insert new user
            const { error } = await supabase.from('users').insert([
              {
                email: user.email,
                name: user.name,
                image: user.image,
                provider: 'google',
                provider_id: profile.sub,
              },
            ]);
            if (error) throw error;
          } else {
            // Update existing user
            const { error } = await supabase
              .from('users')
              .update({
                name: user.name,
                image: user.image,
                provider: 'google',
                provider_id: profile.sub,
              })
              .eq('email', user.email);
            if (error) throw error;
          }
        } catch (error) {
          console.error('Error saving user to Supabase:', error);
          return false;
        }
      }
      return true;
    },
    async session({ session, token }) {
      return session;
    },
    async jwt({ token, user }) {
      return token;
    },
  },
});

export { handler as GET, handler as POST }; 