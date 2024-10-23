/* eslint-disable no-unused-vars */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import Link from 'next/link';
import { FormSignInSchema } from "@/libs/schema/auth";
import { toast } from "react-toastify";
import SignInWithGoogle from "../SignInWithGoogle";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";

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
    const result = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (!result?.ok) {
      toast.error("Email or password not correct!", {
        theme: "dark",
      });
      return;
    }
    console.log(props.callbackUrl);
    toast.success("Welcome to WSocial");
    router.push(props.callbackUrl ? props.callbackUrl : "/");
  };

  return (
    <form onSubmit={handleSubmit(processForm)} className="space-y-4">
      <div className="relative">
        <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
        <input
          type="email"
          placeholder="Email"
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          {...register("email")}
          defaultValue=""
          required
        />
      </div>
      <div className="relative">
        <FaLock className="absolute left-3 top-3 text-gray-400" />
        <input
          type="password"
          placeholder="Password"
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          defaultValue=""
          {...register("password")}
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
      >
        {isSubmitting ? "Please wait ..." : "Login"}
      </button>
      <br/>
      <button className="w-full text-grey px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300">
            <Link href={'/auth/signup'}>Create New Account</Link>
      </button>
    </form>
  );
};

export default SignInForm;
