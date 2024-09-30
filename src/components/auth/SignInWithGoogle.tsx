import { signIn } from 'next-auth/react';

const SignInWithGoogle = () => {
  const googleSignIn = async () => {
    const result = await signIn('google', {
      callbackUrl: '/',
    });
    console.log(result);
  };

  return (
    <div className='m-3 flex items-center justify-center border-t p-4'>
      <button className='text-white' onClick={googleSignIn}>Google</button>
    </div>
  );
};

export default SignInWithGoogle;
