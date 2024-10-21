/* eslint-disable no-unused-vars */
'use client';
import { FormSignUpSchema } from '@/libs/schema/auth/FormSignupSchema';
import { API_SIGNUP } from '@/utils/api-links';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { SubmitHandler, useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import Link from 'next/link';

type Inputs = z.infer<typeof FormSignUpSchema>;
interface Props {
  callbackUrl?: string;
}

const SignUpForm = (props: Props) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    resolver: zodResolver(FormSignUpSchema),
  });



  const processForm: SubmitHandler<Inputs> = async (data) => {
    const create = await fetch(
            API_SIGNUP,
            {
              method: "POST",
              body: JSON.stringify({
                email: data.email,
                password: data.password,
                fullName: data.email
              }),
              headers: {
                "Content-Type": "application/json",
              },
            }
    );

    if (!create.ok) {
      console.error("Error:", create.status, create.statusText);
      return null;
    }


    const login = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (!login?.ok) {
      toast.error("Invalid field(s)", {
        theme: "dark",
      });
      return;
    }

    console.log(props.callbackUrl);
    toast.success("Welcome to JobNetwork");
    router.push(props.callbackUrl ? props.callbackUrl : "/");
  };
  
  return (
    <form onSubmit={handleSubmit(processForm)}>
      <label>Email</label>
      <div className="relative">
        <input
          type="email"
          placeholder="Email Address"
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          defaultValue="example@gmail.com"
          {...register("email")}
          required
        />
      </div>
      <label>Password</label>
      <div className="relative">
        <input
          type="password"
          placeholder="Password"
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          defaultValue=""
          {...register("password")}
          required
        />
      </div>
      <label>Confirm Password</label>
      <div className="relative">
        <input
          type="password"
          placeholder="Password"
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          defaultValue="123456"
          {...register("rePassword")}
          required
        />
      </div>
      <br/>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300">
        {isSubmitting ? "Please wait ..." : "Confirm"}
      </button>
      <br/>
      <button className="w-full text-grey px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300">
            <Link href={'/auth/signin'}>Login</Link>
      </button>
    </form>
  );
};

export default SignUpForm;
