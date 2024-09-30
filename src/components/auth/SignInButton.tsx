'use client';

import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';

const SignInButton = () => {
  const { data: session } = useSession();

  return (
    <div>
      {session && session.user ? (
        <>
          <button>
            <Link href={'/auth/signout'}>Sign out</Link>
          </button>
        </>
      ) : (
        <>
          <button onClick={() => signIn()}>Sign In</button>
          <button>
            <Link href={'/auth/signup'}>Sign Up</Link>
          </button>
        </>
      )}
    </div>
  );
};

export default SignInButton;
