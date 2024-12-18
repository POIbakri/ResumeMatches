import { User, Session } from '@supabase/supabase-js';

const DEMO_USER: User = {
  id: 'demo-user',
  email: 'demo@example.com',
  created_at: new Date().toISOString(),
  app_metadata: {},
  user_metadata: {},
  aud: 'authenticated',
  role: 'authenticated',
};

let currentSession: Session | null = null;

export const demoAuth = {
  getSession: () => Promise.resolve({ data: { session: currentSession }, error: null }),
  signInWithPassword: () => {
    currentSession = {
      access_token: 'demo-token',
      token_type: 'bearer',
      expires_in: 3600,
      refresh_token: 'demo-refresh',
      user: DEMO_USER,
      expires_at: Date.now() + 3600000,
    };
    return Promise.resolve({ data: { session: currentSession }, error: null });
  },
  signOut: () => {
    currentSession = null;
    return Promise.resolve({ error: null });
  },
  onAuthStateChange: (callback: (event: string, session: Session | null) => void) => {
    // Initial call
    callback('SIGNED_IN', currentSession);
    
    return {
      data: { 
        subscription: { 
          unsubscribe: () => {} 
        }
      },
    };
  },
  getUser: () => Promise.resolve({ data: { user: DEMO_USER }, error: null }),
};