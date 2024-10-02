"use client";
import React, { useState, useEffect } from "react";
import {
  FaHome,
  FaBriefcase,
  FaUsers,
  FaBell,
  FaSearch,
  FaFilter,
  FaThumbsUp,
  FaComment,
  FaShare,
  FaCalendar,
  FaTimes,
  FaUser,
  FaSignOutAlt,
  FaReply,
} from "react-icons/fa";

import { signOut } from "next-auth/react";
import Link from "next/link";

const JobNetworkSocialPage = () => {
  const [jobs, setJobs] = useState([]);
  const [posts, setPosts] = useState([]);
  const [events, setEvents] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    setJobs([
      {
        id: 1,
        title: "Frontend Developer",
        company: "TechCorp",
        location: "New York, NY",
        deadline: "2023-07-30",
        likes: 5,
        category: "Tech",
        comments: [
          {
            id: 1,
            author: "Alice",
            content: "This looks like a great opportunity!",
            replies: [
              {
                id: 11,
                author: "Bob",
                content: "@Alice I agree! The company culture seems amazing.",
                replies: [
                  {
                    id: 111,
                    author: "Charlie",
                    content:
                      "@Bob @Alice I've worked there before, it's fantastic!",
                  },
                ],
              },
              {
                id: 12,
                author: "David",
                content: "@Alice Have you applied yet?",
              },
            ],
          },
          {
            id: 2,
            author: "Eve",
            content: "I've heard good things about TechCorp.",
            replies: [],
          },
          {
            id: 3,
            author: "Frank",
            content: "Does anyone know if they offer remote work?",
            replies: [
              {
                id: 31,
                author: "Grace",
                content: "@Frank Yes, they have a flexible remote work policy.",
                replies: [
                  {
                    id: 311,
                    author: "Henry",
                    content:
                      "@Grace @Frank That's great to know! Thanks for sharing.",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 2,
        title: "UX Designer",
        company: "DesignHub",
        location: "San Francisco, CA",
        deadline: "2023-08-15",
        likes: 3,
        category: "Design",
        comments: [],
      },
      {
        id: 3,
        title: "Data Analyst",
        company: "DataTech",
        location: "Chicago, IL",
        deadline: "2023-08-05",
        likes: 7,
        category: "Data",
        comments: [],
      },
    ]);

    setPosts([
      {
        id: 1,
        author: "John Doe",
        content: "Just landed a new job as a Software Engineer!",
        likes: 15,
        comments: 3,
      },
      {
        id: 2,
        author: "Jane Smith",
        content: "Looking for networking opportunities in the finance sector.",
        likes: 8,
        comments: 2,
      },
      {
        id: 3,
        author: "Mike Johnson",
        content: "Excited to speak at the upcoming Tech Conference!",
        likes: 22,
        comments: 5,
      },
    ]);

    setEvents([
      {
        id: 1,
        title: "Tech Networking Mixer",
        date: "2023-07-25",
        time: "18:00",
        location: "TechHub, New York",
      },
      {
        id: 2,
        title: "Job Fair 2023",
        date: "2023-08-10",
        time: "10:00",
        location: "Convention Center, Chicago",
      },
      {
        id: 3,
        title: "Career Development Workshop",
        date: "2023-08-20",
        time: "14:00",
        location: "Online",
      },
    ]);

    setNotifications([
      { id: 1, message: "New job match: Senior Developer at InnoTech" },
      { id: 2, message: "Sarah Lee viewed your profile" },
      { id: 3, message: "Reminder: Tech Networking Mixer today at 6 PM" },
    ]);

    setComments({
      1: [
        { id: 1, author: "Alice", content: "Congratulations!" },
        { id: 2, author: "Bob", content: "That's awesome!" },
      ],
      2: [{ id: 1, author: "Charlie", content: "I can help you with that." }],
      3: [{ id: 1, author: "David", content: "Looking forward to your talk!" }],
    });
  }, []);

  const handleLikeJob = (jobId) => {
    setJobs(
      jobs.map((job) =>
        job.id === jobId ? { ...job, likes: job.likes + 1 } : job
      )
    );
  };

  const handleShareJob = (jobId) => {
    alert(`Job with ID ${jobId} has been shared!`);
  };

  const handleApplyJob = (jobId) => {
    alert(`You've applied for the job with ID ${jobId}!`);
  };

  const handleAddComment = (jobId) => {
    if (newComment.trim()) {
      setJobs(
        jobs.map((job) => {
          if (job.id === jobId) {
            const updatedComments = [...job.comments];
            if (replyingTo) {
              const addReply = (comments, replyTo) => {
                for (const comment of comments) {
                  if (comment.id === replyTo.id) {
                    if (!comment.replies) {
                      comment.replies = [];
                    }
                    comment.replies.push({
                      id: Date.now(),
                      author: "You",
                      content: `@${replyTo.author} ${newComment}`,
                      replies: [],
                    });
                    return true;
                  }
                  if (comment.replies && addReply(comment.replies, replyTo)) {
                    return true;
                  }
                }
                return false;
              };
              addReply(updatedComments, replyingTo);
            } else {
              updatedComments.push({
                id: Date.now(),
                author: "You",
                content: newComment,
                replies: [],
              });
            }
            return { ...job, comments: updatedComments };
          }
          return job;
        })
      );
      setNewComment("");
      setReplyingTo(null);
    }
  };

  const handleShowCommentModal = (jobId) => {
    setSelectedJobId(jobId);
    setShowCommentModal(true);
  };

  const handleCloseCommentModal = () => {
    setShowCommentModal(false);
    setSelectedJobId(null);
    setReplyingTo(null);
  };

  const handleReply = (comment) => {
    setReplyingTo(comment);
  };

  const handleCancelReply = () => {
    setReplyingTo(null);
  };

  const filteredJobs = jobs
    .filter(
      (job) =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(
      (job) => filterCategory === "All" || job.category === filterCategory
    );

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  const countTotalComments = (comments) => {
    let total = comments.length;
    for (const comment of comments) {
      if (comment.replies) {
        total += countTotalComments(comment.replies);
      }
    }
    return total;
  };
  const renderComments = (comments, level = 0) => {
    const isLevelTwoOrHigher = level >= 3;
    let paddingLeft;
    if (level === 0) {
      paddingLeft = "0px";
    } else {
      paddingLeft = isLevelTwoOrHigher ? "0px" : `32px`;
    }

    return comments.map((comment) => (
      <div
        key={comment.id}
        style={{ paddingLeft }} // Áp dụng style
        className={`bg-gray-${100 + level * 100} rounded mb-2 `}
      >
        <p className="font-semibold">{comment.author}</p>
        <p>{comment.content}</p>
        <button
          onClick={() => handleReply(comment)}
          className="text-blue-500 hover:text-blue-700 text-sm mt-1"
        >
          <FaReply className="inline mr-1" /> Reply
        </button>
        {comment.replies && comment.replies.length > 0 && (
          <div className="mt-2">
            {renderComments(comment.replies, level + 1)}
          </div>
        )}
      </div>
    ));
  };
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img
              src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&h=100&q=80"
              alt="JobNetwork Logo"
              className="w-10 h-10 rounded-full"
            />
            <h1 className="text-2xl font-bold text-blue-600">JobNetwork</h1>
          </div>
          <nav>
            <ul className="flex space-x-6 items-center">
              <li>
                <a
                  href="#"
                  className="flex items-center text-gray-600 hover:text-blue-600"
                >
                  <FaHome className="mr-2" /> Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center text-gray-600 hover:text-blue-600"
                >
                  <FaBriefcase className="mr-2" /> Jobs
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center text-gray-600 hover:text-blue-600"
                >
                  <FaUsers className="mr-2" /> Network
                </a>
              </li>
              <li className="relative">
                <button
                  onClick={toggleDropdown}
                  className="flex items-center focus:outline-none"
                >
                  <img
                    src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=40&h=40&q=80"
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full"
                  />
                </button>
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                    <Link
                      href="/auth/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <FaUser className="inline-block mr-2" />
                      Thông tin cá nhân
                    </Link>
                    <button
                      onClick={() => signOut()}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <FaSignOutAlt className="inline-block mr-2" />
                      Đăng xuất
                    </button>
                  </div>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 flex flex-wrap">
        <div className="w-full lg:w-3/4 pr-8">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Job Listings</h2>
            <div className="flex justify-between mb-4">
              <div className="relative flex-grow mr-4">
                <input
                  type="text"
                  placeholder="Search jobs..."
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <FaSearch className="absolute left-3 top-3 text-gray-400" />
              </div>
              <select
                className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                <option value="All">All Categories</option>
                <option value="Tech">Tech</option>
                <option value="Design">Design</option>
                <option value="Data">Data</option>
              </select>
            </div>
            <div className="space-y-4">
              {filteredJobs.map((job) => (
                <div key={job.id} className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
                  <p className="text-gray-600 mb-2">
                    {job.company} - {job.location}
                  </p>
                  <p className="text-sm text-gray-500 mb-4">
                    Application Deadline: {job.deadline}
                  </p>
                  <div className="flex justify-between items-center mb-4">
                    <button
                      onClick={() => handleApplyJob(job.id)}
                      className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300"
                    >
                      Apply Now
                    </button>
                    <div className="flex space-x-4">
                      <button
                        onClick={() => handleLikeJob(job.id)}
                        className="flex items-center text-gray-600 hover:text-blue-600"
                      >
                        <FaThumbsUp className="mr-2" /> {job.likes}
                      </button>
                      <button
                        onClick={() => handleShowCommentModal(job.id)}
                        className="flex items-center text-gray-600 hover:text-blue-600"
                      >
                        <FaComment className="mr-2" />{" "}
                        {countTotalComments(job.comments)}
                      </button>
                      <button
                        onClick={() => handleShareJob(job.id)}
                        className="flex items-center text-gray-600 hover:text-blue-600"
                      >
                        <FaShare className="mr-2" /> Share
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Job Blog Posts</h2>
            <div className="space-y-4">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white p-6 rounded-lg shadow-md"
                >
                  <h3 className="font-semibold mb-2">{post.author}</h3>
                  <p className="text-gray-700 mb-4">{post.content}</p>
                  <div className="flex space-x-4 mb-4">
                    <button className="flex items-center text-gray-600 hover:text-blue-600">
                      <FaThumbsUp className="mr-2" /> {post.likes}
                    </button>
                    <button className="flex items-center text-gray-600 hover:text-blue-600">
                      <FaComment className="mr-2" /> {post.comments}
                    </button>
                    <button className="flex items-center text-gray-600 hover:text-blue-600">
                      <FaShare className="mr-2" /> Share
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Community Events</h2>
            <div className="space-y-4">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="bg-white p-6 rounded-lg shadow-md"
                >
                  <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                  <p className="text-gray-600 mb-2">
                    <FaCalendar className="inline mr-2" /> {event.date} at{" "}
                    {event.time}
                  </p>
                  <p className="text-gray-600 mb-4">{event.location}</p>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300">
                    RSVP
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside className="w-full lg:w-1/4 mt-8 lg:mt-0">
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <img
              src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&h=200&q=80"
              alt="User Profile"
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-center mb-2">John Doe</h3>
            <p className="text-gray-600 text-center mb-4">Software Developer</p>
            <button className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300">
              Edit Profile
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h3 className="text-xl font-semibold mb-4">Notifications</h3>
            <ul className="space-y-2">
              {notifications.map((notification) => (
                <li key={notification.id} className="flex items-start">
                  <FaBell className="text-blue-500 mt-1 mr-2 flex-shrink-0" />
                  <p className="text-gray-700">{notification.message}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
            <ul className="space-y-2 text-gray-700">
              <li>You viewed 5 new job listings</li>
              <li>Your profile was viewed by 3 recruiters</li>
              <li>You connected with 2 new professionals</li>
            </ul>
          </div>
        </aside>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between">
            <div className="w-full md:w-1/3 mb-6 md:mb-0">
              <h4 className="text-lg font-semibold mb-4">About JobNetwork</h4>
              <p className="text-gray-400">
                Connecting professionals and opportunities worldwide.
              </p>
            </div>
            <div className="w-full md:w-1/3 mb-6 md:mb-0">
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
            <div className="w-full md:w-1/3">
              <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <FaUsers />
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <FaBriefcase />
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <FaBell />
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 text-center text-gray-400">
            <p>&copy; 2023 JobNetwork. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {showCommentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Comments</h3>
              <button
                onClick={handleCloseCommentModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes />
              </button>
            </div>
            <div className="max-h-60 overflow-y-auto mb-4">
              {renderComments(
                jobs.find((job) => job.id === selectedJobId)?.comments || []
              )}
            </div>
            <div className="flex flex-col">
              {replyingTo && (
                <div className="text-sm text-gray-600 mb-2 flex justify-between items-center">
                  <span>Replying to {replyingTo.author}</span>
                  <button
                    onClick={handleCancelReply}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTimes />
                  </button>
                </div>
              )}
              <input
                type="text"
                placeholder={
                  replyingTo
                    ? `Reply to ${replyingTo.author}...`
                    : "Add a comment..."
                }
                className="flex-grow mr-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <button
                onClick={() => handleAddComment(selectedJobId)}
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
              >
                {replyingTo ? "Reply" : "Comment"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobNetworkSocialPage;
