import React, { useState, ReactNode, useEffect } from "react";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="container mx-auto px-4 py-8 flex flex-wrap">
            <div className="w-full lg:w-3/4 pr-8">
              {/* <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <PostForm onPostCreated={handleRefresh} />
          </div> */}
              {/* <PostList key={refreshTrigger} /> */}
              {children}
            </div>

            {/* <aside className="w-full lg:w-1/4 mt-8 lg:mt-0">
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <img
              src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&h=200&q=80"
              alt="User Profile"
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-center mb-2">John Doe</h3>
            <p className="text-gray-600 text-center mb-4">Software Developer</p>
            <button
              onClick={() => router.push("/profile")}
              className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
            >
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
        </aside> */}
          </main>
    </>
  );
}
