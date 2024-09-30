import SignInForm from "@/components/auth/form/SignInForm";

interface Props {
  searchParams: {
    callbackUrl?: string;
  };
}

const SigninPage = ({ searchParams }: Props) => {
  return (
    <div className="bg-custom-gradient">
      <div className="container mx-auto flex h-screen">
        <SignInForm callbackUrl={searchParams.callbackUrl} />
      </div>
    </div>
  );
};

export default SigninPage;
