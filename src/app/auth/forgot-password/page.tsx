/* eslint-disable no-unused-vars */
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

const FormSchema = z.object({
  email: z.string().email('Please enter a valid email!'),
});

type InputType = z.infer<typeof FormSchema>;

const ForgotPasswordPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<InputType>({
    resolver: zodResolver(FormSchema),
  });

  const submitRequest: SubmitHandler<InputType> = async (data) => {
    try {
      // const result = await forgotPassword(data.email);
      reset();
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className='grid grid-cols-1 items-center md:grid-cols-3'>
      <form
        className='m-2 flex flex-col gap-2 rounded-md border p-2 shadow'
        onSubmit={handleSubmit(submitRequest)}
      >
        <div className='p-2 text-center'>Enter Your Email</div>
        <label>Email</label>
        <input type='text' />

        <button
          type='submit'
          disabled={isSubmitting}
          color='primary'
        >
          {isSubmitting ? 'Please Wait...' : 'Submit'}
        </button>
      </form>
      <Image
        src={'/forgotPass.png'}
        alt='Forgot Password'
        width={500}
        height={500}
        className='col-span-2 place-self-center'
      />
    </div>
  );
};

export default ForgotPasswordPage;
