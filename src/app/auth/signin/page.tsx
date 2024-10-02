import SignInForm from "@/components/auth/form/SignInForm";

interface Props {
  searchParams: {
    callbackUrl?: string;
  };
}

const SigninPage = ({ searchParams }: Props) => {
  return (
    // <div className="bg-custom-gradient">
    //   <div className="container mx-auto flex h-screen">
    //     <SignInForm callbackUrl={searchParams.callbackUrl} />
    //   </div>
    // </div>
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <div className="flex items-center justify-center mb-8">
          <img
            src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&h=100&q=80"
            alt="JobNetwork Logo"
            className="w-12 h-12 rounded-full mr-4"
          />
          <h1 className="text-2xl font-bold text-blue-600">JobNetwork</h1>
        </div>
        <h2 className="text-2xl font-semibold mb-6 text-center">Sign In</h2>
        <SignInForm callbackUrl={searchParams.callbackUrl} />
      </div>
    </div>
  );
};

export default SigninPage;
