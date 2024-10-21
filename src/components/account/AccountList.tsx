import React, { useState, useEffect } from "react";
import { API_ACCOUNT_LOAD, API_POST_LOAD } from "@/utils/api-links";

interface Props {
  key?: string;
}

const AccountList = ({ key } : Props) => {
  const [accs, setAccs] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, [key]);

  const fetchPosts = async () => {
    try {
      const response = await fetch(
        API_ACCOUNT_LOAD + `?$filter=contains(fullNameSearch, '${key}')`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setAccs(data);
    } catch (error) {
      console.error("Error fetching accounts:", error);
    }
  };

  return (
    <section className="mb-8">
      <div className="space-y-4">
        {accs.map((obj) => (
          <div key={obj.AccountId} className="bg-white p-6 rounded-lg shadow-md">
            <h6 className="text-gray-700 mb-4">{obj.fullName}</h6>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AccountList;
