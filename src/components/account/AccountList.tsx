"use client";
import React, { useState, useEffect } from "react";
import { API_ACCOUNT_LOAD, API_POST_LOAD } from "@/utils/api-links";

interface Props {
  key?: string;
}

const AccountList = ({ key }: Props) => {
  const [accs, setAccs] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, [key]);

  const fetchPosts = async () => {
    try {
      const response = await fetch(
        API_ACCOUNT_LOAD //+ `?$filter=contains(fullNameSearch, '${key}')`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setAccs(data.result);
    } catch (error) {
      console.error("Error fetching accounts:", error);
    }
  };

  return (
    <section className="w-full mb-8">
      <h1 className="justify-self-center text-2xl font-semibold mb-4 mt-2">People you might know</h1>
      <div className="space-y-4">
        {accs.map((obj) => (
          <div
            key={obj.accountId}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <div>
              <img
                src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&h=200&q=80"
                alt="User Profile"
                className="w-24 h-24 rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold text-center mb-2">
                {obj.fullName === "" ? "Alexa" : obj.fullName}
              </h3>
              <p className="text-gray-600 text-center mb-4">
                {obj.username === "" ? "username" : obj.username}
              </p>
              <button
                // onClick={() => router.push("/profile")}
                className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
              >
                Follow
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AccountList;
