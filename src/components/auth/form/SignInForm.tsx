/* eslint-disable no-unused-vars */
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { FormSignInSchema } from '@/libs/schema/auth';
import { toast } from 'react-toastify';
import SignInWithGoogle from '../SignInWithGoogle';

type Inputs = z.infer<typeof FormSignInSchema>;

interface Props {
  callbackUrl?: string;
}

const SignInForm = (props: Props) => {
  const router = useRouter();
  const [visiblePass, setVisiblePass] = React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    resolver: zodResolver(FormSignInSchema),
  });

  const processForm: SubmitHandler<Inputs> = async (data) => {
    const result = await signIn('credentials', {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    console.log(result);

    if (!result?.ok) {
      toast.error('Email or password not correct!', {
        theme: 'dark',
      });
      return;
    }
    console.log(props.callbackUrl);
    toast.success('Welcome to AIO');
    router.push(props.callbackUrl ? props.callbackUrl : '/');
  };

  return (
    <form
      className='m-auto max-w-sm shadow-lg'
      onSubmit={handleSubmit(processForm)}
    >
      <div className='bg-boxdark p-2 text-center text-2xl font-semibold text-white'>
        AIO
      </div>
      {/* <div className='flex items-start justify-center gap-3 bg-bluewhite p-4 text-white'>
        Sign In
      </div> */}
      <div className='p-8'>
        <input
          id='email'
          type='email'
          placeholder='Email'
          className='mb-3 mt-2 w-full rounded border px-3 py-2 leading-tight focus:border-blue focus:outline-none'
          defaultValue='trietcn115@fpt.com'
          {...register('email')}
        />
        <input
          id='password'
          type='password'
          placeholder='**************'
          autoComplete='off'
          className='mb-3 mt-2 w-full rounded border px-3 py-2 leading-tight focus:border-blue focus:outline-none'
          defaultValue='123456'
          {...register('password')}
        />
        <div className='mt-2'>
          <button
            className='w-full rounded-sm border border-black-2 bg-boxdark p-2 text-xl text-white'
            type='submit'
          >
            {isSubmitting ? 'Please wait ...' : 'NEXT'}
          </button>
        </div>
      </div>

      <SignInWithGoogle />
    </form>
  );
};

export default SignInForm;
