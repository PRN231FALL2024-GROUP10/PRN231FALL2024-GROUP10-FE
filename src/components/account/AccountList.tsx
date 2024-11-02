"use client";
import React, { useState, useEffect } from "react";
import { API_ACCOUNT_LOAD, API_POST_LOAD } from "@/utils/api-links";
import { getSession, useSession } from "next-auth/react";
import { FollowButton } from "../common/FollowButton";

interface Props {
  key?: string;
}

const AccountList = ({ key }: Props) => {
  const { data: session } = useSession();
  const [accs, setAccs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const Session = await getSession();

      fetchAccs(Session?.data.accessToken);
    };

    fetchData();
  }, [key]);

  const fetchAccs = async (token) => {
    try {
      const response = await fetch(
        API_ACCOUNT_LOAD //+ `?$filter=contains(fullNameSearch, '${key}')`
      , {
        headers: {
          "Content-Type":
            "application/json;odata.metadata=minimal;odata.streaming=true",
          Authorization: `Bearer ${token}`,
        }
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      const matchItems = data.filter(
        (obj: any) => obj.isFollowed === false
      );
      await setAccs(matchItems);

      console.log(accs);
    } catch (error) {
      console.error("Error fetching accounts:", error);
    }
  };

  return (
    <section className="w-full mb-8">
      <h1 className="justify-self-center text-2xl font-semibold mb-4 mt-2">People you might know</h1>
      <div className="space-y-4">
        {accs?.map((obj) => (
          <div
            key={obj.accountId}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <div>
              <img
                src={obj.image? obj.image : "https://firebasestorage.googleapis.com/v0/b/bmos-image-prn.appspot.com/o/User%2F3c9fab92-7598-4125-869d-803d07dffe88?alt=media&token=ddd0a573-2db3-4329-acec-4bee2734bab1"}
                alt="User Profile"
                className="w-24 h-24 rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold text-center mb-2">
                {obj.fullName === "" ? "Alexa" : obj.fullName}
              </h3>
              <p className="text-gray-600 text-center mb-4">
                {obj.username === "" ? "username" : obj.username}
              </p>
              <FollowButton conditionChanged={fetchAccs} condition={obj.isFollowed} accessToken={session?.data.accessToken} accountId={obj.accountId}></FollowButton>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AccountList;
