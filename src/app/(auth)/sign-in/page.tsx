import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function LoginPage() {
  return (
    <div className="">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 flex justify-between items-center p-4 bg-white shadow-sm">
        <div className="flex items-center">
          <span className="ml-2 text-xl font-bold">Wenet.work</span>
        </div>
        <div className="space-x-2">
          <Button variant="ghost">Login</Button>
          <Button>Join Now</Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="h-screen flex-grow flex flex-col md:flex-row">
        {/* Left side - Photo */}
        <div className="w-full md:w-1/2 bg-gray-200">
          <Image
            src="https://dcl-quochuynhwebsite.b-cdn.net/campaign-creators-qCi_MzVODoU-unsplash%20(1).jpg"
            alt="Login visual"
            width={600}
            height={800}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right side - Login Form */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-8">
          <div className="max-w-md w-full space-y-8">
            <div>
              <h2 className="mt-6 text-left text-3xl font-extrabold text-gray-900">
                Sign in
              </h2>
            </div>
            <form className="mt-8 space-y-6" action="#" method="POST">
              <div className="rounded-md shadow-sm space-y-4">
                <div>
                  <label htmlFor="email-address" className="sr-only">
                    Email
                  </label>
                  <Input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="Email address"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">
                    Mật khẩu
                  </label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    placeholder="Password"
                  />
                </div>
              </div>

              {/* <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <Link href="#" className="font-medium text-primary hover:text-primary-dark">
                    Forgot your password?
                  </Link>
                </div>
              </div> */}

              <div>
                <Button type="submit" className="w-full py-5">
                  Sign in
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}