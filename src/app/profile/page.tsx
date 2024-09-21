import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { PlusCircle, MessageCircle, UserPlus, Pencil, Search, Home, Users, Briefcase, Bell } from 'lucide-react'

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navigation Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4 md:justify-start md:space-x-10">
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <Link href="/">
                <span className="sr-only">LinkedIn</span>
                <Image
                  src="/placeholder.svg?height=34&width=34"
                  alt="LinkedIn"
                  width={34}
                  height={34}
                  className="h-8 w-auto sm:h-10"
                />
              </Link>
            </div>
            <div className="flex-1 max-w-xs">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  type="text"
                  placeholder="Search"
                  className="pl-10 py-2 w-full"
                />
              </div>
            </div>
            <nav className="hidden md:flex space-x-10">
              <Link href="/" className="text-base font-medium text-gray-500 hover:text-gray-900">
                <Home className="h-5 w-5 mx-auto" />
                <span className="sr-only">Home</span>
              </Link>
              <Link href="/network" className="text-base font-medium text-gray-500 hover:text-gray-900">
                <Users className="h-5 w-5 mx-auto" />
                <span className="sr-only">My Network</span>
              </Link>
              <Link href="/jobs" className="text-base font-medium text-gray-500 hover:text-gray-900">
                <Briefcase className="h-5 w-5 mx-auto" />
                <span className="sr-only">Jobs</span>
              </Link>
              <Link href="/messaging" className="text-base font-medium text-gray-500 hover:text-gray-900">
                <MessageCircle className="h-5 w-5 mx-auto" />
                <span className="sr-only">Messaging</span>
              </Link>
              <Link href="/notifications" className="text-base font-medium text-gray-500 hover:text-gray-900">
                <Bell className="h-5 w-5 mx-auto" />
                <span className="sr-only">Notifications</span>
              </Link>
            </nav>
            <div className="flex items-center justify-end md:flex-1 lg:w-0">
              <Image
                src="/placeholder.svg?height=32&width=32"
                alt="User"
                width={32}
                height={32}
                className="h-8 w-8 rounded-full"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Profile Header */}
      <div className="bg-white shadow">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative py-5">
            {/* Background Image */}
            <div className="h-32 w-full bg-gray-300 rounded-t-lg">
              <Image
                src="/placeholder.svg?height=128&width=896"
                alt="Profile background"
                layout="fill"
                objectFit="cover"
                className="rounded-t-lg"
              />
            </div>
            {/* Profile Picture */}
            <div className="absolute bottom-0 left-5 -mb-16">
              <Image
                src="/placeholder.svg?height=128&width=128"
                alt="Profile picture"
                width={128}
                height={128}
                className="rounded-full border-4 border-white"
              />
            </div>
          </div>
          {/* Profile Info */}
          <div className="mt-16 pb-5 flex justify-between items-end">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">John Doe</h1>
              <p className="text-xl text-gray-600">Software Engineer at Tech Company</p>
              <p className="text-sm text-gray-500">San Francisco Bay Area • 500+ connections</p>
            </div>
            <div className="flex space-x-2">
              <Button><MessageCircle className="mr-2 h-4 w-4" /> Message</Button>
              <Button variant="outline"><UserPlus className="mr-2 h-4 w-4" /> Connect</Button>
              <Button variant="outline"><PlusCircle className="mr-2 h-4 w-4" /> More</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* About Section */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>About</CardTitle>
              <Button variant="ghost" size="icon"><Pencil className="h-4 w-4" /></Button>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Passionate software engineer with 5+ years of experience in developing scalable web applications.
                Skilled in React, Node.js, and cloud technologies. Always eager to learn and tackle new challenges.
              </p>
            </CardContent>
          </Card>

          {/* Experience Section */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Experience</CardTitle>
              <Button variant="ghost" size="icon"><PlusCircle className="h-4 w-4" /></Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex">
                  <div className="mr-4 flex-shrink-0">
                    <Image
                      src="/placeholder.svg?height=48&width=48"
                      alt="Tech Company logo"
                      width={48}
                      height={48}
                      className="rounded"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Software Engineer</h3>
                    <p className="text-sm text-gray-600">Tech Company • Full-time</p>
                    <p className="text-sm text-gray-500">Jan 2020 - Present • 3 yrs 6 mos</p>
                    <p className="text-sm text-gray-600 mt-2">
                      Leading development of microservices architecture. Implementing CI/CD pipelines and improving system reliability.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Education Section */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Education</CardTitle>
              <Button variant="ghost" size="icon"><PlusCircle className="h-4 w-4" /></Button>
            </CardHeader>
            <CardContent>
              <div className="flex">
                <div className="mr-4 flex-shrink-0">
                  <Image
                    src="/placeholder.svg?height=48&width=48"
                    alt="University logo"
                    width={48}
                    height={48}
                    className="rounded"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">University of Technology</h3>
                  <p className="text-sm text-gray-600">Bachelor of Science in Computer Science</p>
                  <p className="text-sm text-gray-500">2015 - 2019</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Skills Section */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Skills</CardTitle>
              <Button variant="ghost" size="icon"><Pencil className="h-4 w-4" /></Button>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Badge>React</Badge>
                <Badge>Node.js</Badge>
                <Badge>JavaScript</Badge>
                <Badge>TypeScript</Badge>
                <Badge>AWS</Badge>
                <Badge>Docker</Badge>
                <Badge>Kubernetes</Badge>
                <Badge>GraphQL</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}