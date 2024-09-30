/* eslint-disable no-unused-vars */
'use client';
import { FormSignUpSchema } from '@/libs/schema/auth/FormSignupSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type Inputs = z.infer<typeof FormSignUpSchema>;

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(FormSignUpSchema),
  });

  return (
    <form>
      <label>First name</label>
      <input type='text'></input>

      <label>Last name</label>
      <input type='text'></input>

      <label>Email</label>
      <input type='text'></input>

      <label>Phone</label>
      <input type='number'></input>

      <label>Password</label>
      <input type='password'></input>

      <label>Confirm password</label>
      <input type='password'></input>
    </form>
  );
};

export default SignUpForm;
