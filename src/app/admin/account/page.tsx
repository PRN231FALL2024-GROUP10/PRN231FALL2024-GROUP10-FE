"use client";

import { useEffect, useState } from "react";

interface Account {
  accountId: number;
  email: string;
  fullName: string;
  username: string | null;
  role: number;
}

interface ApiResponse {
  result: Account[];
}

export default function AccountPage() {
  const [accounts, setAccounts] = useState<Account[]>([]);

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    const response = await fetch("https://localhost:7207/Accounts");
    const data: ApiResponse = await response.json();
    setAccounts(data.result);
  };

  const handleBanAccount = async (accountId: number) => {
    await fetch(`https://localhost:7207/Account/BanAccount/${accountId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    fetchAccounts();
  };

  const handleUnbanAccount = async (accountId: number) => {
    await fetch(`https://localhost:7207/Account/UnlockAccount/${accountId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    fetchAccounts();
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Account Management</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Full Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Username
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {accounts.map((account) => (
              <tr key={account.accountId} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  {account.accountId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{account.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {account.fullName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {account.username || "-"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      account.role === 0
                        ? "bg-red-100 text-red-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {account.role === 0 ? "Banned" : "Active"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap space-x-2">
                  {account.role !== 0 && (
                    <button
                      onClick={() => handleBanAccount(account.accountId)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Ban
                    </button>
                  )}
                  {account.role === 0 && (
                    <button
                      onClick={() => handleUnbanAccount(account.accountId)}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                    >
                      Unban
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
