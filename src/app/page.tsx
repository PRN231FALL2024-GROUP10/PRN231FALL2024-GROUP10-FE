import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { ThumbsUp, MessageSquare, Repeat2, Send, MoreHorizontal, Search, Home, Users, Briefcase, Bell } from 'lucide-react'

export default function FeedPage() {
  const posts = [
    {
      id: 1,
      author: { name: 'John Doe', role: 'Software Engineer at Tech Co', avatar: '/placeholder.svg?height=40&width=40' },
      content: "Excited to announce that I've just joined Tech Co as a Senior Software Engineer! Looking forward to new challenges and opportunities. #NewJob #TechCo",
      likes: 152,
      comments: 23,
      shares: 5,
    },
    {
      id: 2,
      author: { name: 'Jane Smith', role: 'Marketing Manager', avatar: '/placeholder.svg?height=40&width=40' },
      content: "Just published a new article on 'The Future of Digital Marketing'. Check it out and let me know your thoughts!",
      articleImage: '/placeholder.svg?height=300&width=600',
      articleTitle: 'The Future of Digital Marketing',
      likes: 89,
      comments: 15,
      shares: 12,
    },
    {
      id: 3,
      author: { name: 'Tech Innovations Inc.', role: 'Company', avatar: '/placeholder.svg?height=40&width=40' },
      content: "We're hiring! Looking for talented software developers to join our growing team. Apply now!",
      jobTitle: 'Software Developer',
      jobLocation: 'San Francisco, CA',
      likes: 45,
      comments: 8,
      shares: 20,
    },
    {
      id: 4,
      author: { name: 'Alex Johnson', role: 'Freelance Designer', avatar: '/placeholder.svg?height=40&width=40' },
      content: "Just completed a major rebranding project for a client. Here's a sneak peek of the new logo design!",
      imageUrl: '/placeholder.svg?height=300&width=600',
      likes: 201,
      comments: 32,
      shares: 7,
    },
    {
      id: 5,
      author: { name: 'Sarah Lee', role: 'Data Scientist', avatar: '/placeholder.svg?height=40&width=40' },
      content: "Attended an amazing conference on AI and Machine Learning yesterday. The future of technology is incredibly exciting! #AI #MachineLearning",
      likes: 132,
      comments: 18,
      shares: 9,
    },
    {
      id: 6,
      author: { name: 'Michael Brown', role: 'CEO at StartUp X', avatar: '/placeholder.svg?height=40&width=40' },
      content: "Proud to announce that StartUp X has secured $10 million in Series A funding! Grateful for our amazing team and investors. #StartUpLife",
      likes: 543,
      comments: 76,
      shares: 42,
    },
    {
      id: 7,
      author: { name: 'Emily Davis', role: 'HR Specialist', avatar: '/placeholder.svg?height=40&width=40' },
      content: "New blog post: '5 Tips for Acing Your Next Job Interview'. Hope this helps job seekers in our network!",
      articleImage: '/placeholder.svg?height=300&width=600',
      articleTitle: '5 Tips for Acing Your Next Job Interview',
      likes: 98,
      comments: 12,
      shares: 15,
    },
    {
      id: 8,
      author: { name: 'David Wilson', role: 'Software Developer', avatar: '/placeholder.svg?height=40&width=40' },
      content: "Just hit a major milestone: 10 years in the tech industry! Grateful for all the opportunities and amazing people I've met along the way. #CareerMilestone",
      likes: 287,
      comments: 41,
      shares: 3,
    },
    {
      id: 9,
      author: { name: 'Tech Conference 2023', role: 'Event', avatar: '/placeholder.svg?height=40&width=40' },
      content: "Only 2 weeks left until the biggest tech conference of the year! Have you got your tickets yet? #TechConf2023",
      imageUrl: '/placeholder.svg?height=300&width=600',
      likes: 76,
      comments: 9,
      shares: 23,
    },
    {
      id: 10,
      author: { name: 'Lisa Thompson', role: 'Product Manager at Big Tech', avatar: '/placeholder.svg?height=40&width=40' },
      content: "Excited to share that our team's new product feature is now live! It's been months of hard work, but seeing users' positive reactions makes it all worth it. #ProductLaunch",
      likes: 321,
      comments: 47,
      shares: 18,
    },
  ]

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
                <MessageSquare className="h-5 w-5 mx-auto" />
                <span className="sr-only">Messaging</span>
              </Link>
              <Link href="/notifications" className="text-base font-medium text-gray-500 hover:text-gray-900">
                <Bell className="h-5 w-5 mx-auto" />
                <span className="sr-only">Notifications</span>
              </Link>
            </nav>
            <div className="flex items-center justify-end md:flex-1 lg:w-0">
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Create Post Card */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex items-start space-x-4">
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <Input type="text" placeholder="Start a post" className="w-full" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Feed Posts */}
        <div className="space-y-6">
          {posts.map((post) => (
            <Card key={post.id}>
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={post.author.avatar} alt={post.author.name} />
                    <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{post.author.name}</p>
                    <p className="text-sm text-gray-500">{post.author.role}</p>
                  </div>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-800">{post.content}</p>
                {post.articleImage && (
                  <div className="mt-4">
                    <Image
                      src={post.articleImage}
                      alt={post.articleTitle || "Article image"}
                      width={600}
                      height={300}
                      className="rounded-lg"
                    />
                    {post.articleTitle && (
                      <p className="mt-2 font-semibold">{post.articleTitle}</p>
                    )}
                  </div>
                )}
                {post.imageUrl && (
                  <div className="mt-4">
                    <Image
                      src={post.imageUrl}
                      alt="Post image"
                      width={600}
                      height={300}
                      className="rounded-lg"
                    />
                  </div>
                )}
                {post.jobTitle && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold">{post.jobTitle}</h3>
                    <p className="text-sm text-gray-500">{post.jobLocation}</p>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <div className="flex justify-between items-center w-full">
                  <Button variant="ghost" size="sm">
                    <ThumbsUp className="mr-2 h-4 w-4" />
                    Like ({post.likes})
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Comment ({post.comments})
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Repeat2 className="mr-2 h-4 w-4" />
                    Share ({post.shares})
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Send className="mr-2 h-4 w-4" />
                    Send
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}