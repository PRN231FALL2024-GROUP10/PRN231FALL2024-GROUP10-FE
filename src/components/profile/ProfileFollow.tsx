"use client";

import { API_ACCOUNT_LOAD, API_FOLLOW, API_PROFILE_FOLLOW } from "@/utils/api-links";
import { getSession, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { FaConnectdevelop } from "react-icons/fa6";
import { FollowButton } from "../common/FollowButton";
import { useRouter } from "next/navigation";

const ProfileFollow = ({profileId}) => {
  const { data: session } = useSession();
  const [hostId, setHostId] = useState(0);
  const [accs, setAccs] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const Session = await getSession();
      setHostId(Session?.user.accountId);
      await fetchAccs(Session?.data.accessToken);
    };

    fetchData();
  }, []);

  const resetPage = async () => {
    await fetchAccs(session?.data.accessToken);
  }

  const fetchAccs = async (token) => {
    try {
      if(session?.user.accountId == profileId)
        {
          const response = await fetch(
            API_ACCOUNT_LOAD, //+ `?$filter=contains(fullNameSearch, '${key}')`
            {
              headers: {
                "Content-Type":
                  "application/json;odata.metadata=minimal;odata.streaming=true",
                Authorization: `Bearer ${token}`,
              }
            }
          );
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          const matchItems = await data.filter(
            (obj: any) => obj.isFollowed === true
          );
          await setAccs(matchItems);
        }
        else
        {
          const response = await fetch(API_PROFILE_FOLLOW + `${profileId}/follow`, {
            headers: {
              Authorization: `Bearer ${token}`,
            }
          });
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          await setAccs(data);
        }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  return (
    <section className="w-full mb-8">
      <div className="space-y-4">
        {accs.map((obj) =>
          obj.accountId == hostId ? (
            <div
              key={obj.accountId}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <div>
                <img
                  src={obj.image}
                  alt="User Profile"
                  className="w-24 h-24 rounded-full mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold text-center mb-2">
                  {obj.fullName === "" ? "Alexa" : obj.fullName}
                </h3>
                <p className="text-gray-600 text-center mb-4">
                  {obj.username === "" ? "username" : obj.username}
                </p>
                {/* <p className="text-gray-600 text-center mb-4">
                  is following you
                </p>
                <FollowButton
                  conditionChanged={fetchAccs}
                  condition={obj.isFollowed}
                  accessToken={session?.data.accessToken}
                  accountId={obj.accountId}
                ></FollowButton> */}
              </div>
            </div>
          ) : (
            <div
              key={obj.accountId}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <div>
                <img
                  src={obj.image}
                  alt="User Profile"
                  className="w-24 h-24 rounded-full mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold text-center mb-2">
                  {obj.fullName === "" ? "Alexa" : obj.fullName}
                </h3>
                <p className="text-gray-600 text-center mb-4">
                  {obj.username === "" ? "username" : obj.username}
                </p>
                <FollowButton
                  conditionChanged={resetPage}
                  condition={obj.isFollowed}
                  accessToken={session?.data.accessToken}
                  accountId={obj.accountId}
                ></FollowButton>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default ProfileFollow;
