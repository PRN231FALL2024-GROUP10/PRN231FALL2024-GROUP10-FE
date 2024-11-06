"use client";
import React, { useState, useEffect } from "react";
import { FaComment, FaHeart } from "react-icons/fa";
import { API_CHANGE_AVATAR, API_POST_LOAD, API_PROFILE, API_PROFILE_VISITOR } from "@/utils/api-links";
import { getSession, useSession } from "next-auth/react";
import { FollowButton } from "../common/FollowButton";


const ProfilePortrait = ({profileId}) => {
  const [user, setUser] = useState(null);
  const { data: session } = useSession();
  useEffect(() => {
    const fetchData = async () => {
      const Session = await getSession();

      fetchUser(Session?.data.accessToken);
    };

    fetchData();
  }, []);

  const [showUpload, setUpload] = useState("collapse");
  const [uploadButton, setUploadButton] = useState("Change Avatar");
  
  const [images, setImages] = useState([]);
  const uploadImage = () => {
    const file = event.target.files;
    // const formData = new FormData();
    // formData.append('image', file);
    setImages(file);
  };

  const toggleUpload = async () => {
    setUploadButton(
      uploadButton === "Change Avatar" ? "Submit" : "Change Avatar"
    );

    setUpload(showUpload === "collapse" ? "visible" : "collapse");

    if (showUpload === "visible") {
      const formData = new FormData();
      formData.append("Link", images[0]);
      
      try {
        console.log(JSON.stringify(images));
        const response = await fetch(API_CHANGE_AVATAR, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${session?.data.accessToken}`,
          },
          body: formData,
        });

        if (response.ok) {
          console.log("Update successfully");
          setUploadButton("Change Avatar");
          fetchUser(session?.data.accessToken);
        } else {
          console.error("Update failed");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

    const fetchUser = async (token) => {
      try {
        if(session?.user.accountId == profileId)
          {
        const response = await fetch(API_PROFILE,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            }
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        
        await setUser(data.account);
      } else
      {
        const response = await fetch(API_PROFILE_VISITOR + `${profileId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            }
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data);
        await setUser(data.account);
      }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

  return (
    profileId == session?.user.accountId?
    (
      <aside className="w-full mt-8">
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <img
          src={user?.image}
          alt="User Profile"
          className="w-24 h-24 rounded-full mx-auto mb-4"
        />
        <h3 className="text-xl font-semibold text-center mb-2">
          {user?.fullName}
        </h3>
        <p className="text-gray-600 text-center mb-12">
          {user?.username}
        </p>

        <div className={`${showUpload}`}>
          <input
            type="file"
            accept="image/png, image/gif, image/jpeg"
            className="w-full p-2 border rounded"
            onChange={uploadImage}
          />
        </div>
        <button
          onClick={toggleUpload}
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          {uploadButton}
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <ul className="space-y-2 text-gray-700">
          <li>{user?.followerCount} Follower</li>
          <li>{user?.followingCount} Following</li>
        </ul>
        <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
      </div>
    </aside>
    )
    :
    (
<aside className="w-full mt-8">
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <img
          src={user?.image}
          alt="User Profile"
          className="w-24 h-24 rounded-full mx-auto mb-4"
        />
        <h3 className="text-xl font-semibold text-center mb-2">
          {user?.fullName}
        </h3>
        <p className="text-gray-600 text-center mb-12">
          {user?.username}
        </p>
        <FollowButton conditionChanged={() => fetchUser(session?.data.accessToken)} condition={user?.isFollowed} accessToken={session?.data.accessToken} accountId={user?.accountId}></FollowButton>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <ul className="space-y-2 text-gray-700">
          <li>{user?.followerCount} Follower</li>
          <li>{user?.followingCount} Following</li>
        </ul>
        <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
      </div>
    </aside>
    )
    
  );
};

export default ProfilePortrait;
