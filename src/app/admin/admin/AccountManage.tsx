"use client";
import { API_ACCOUNT_ADMIN_LOAD, API_ACCOUNT_BAN, API_ACCOUNT_LOAD, API_ACCOUNT_UNBAN } from "@/utils/api-links";
import { getSession, useSession } from "next-auth/react";
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
export default function AccountManage() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const { data: session } = useSession();
  useEffect(() => {
    const fetchData = async () => {
      const Session = await getSession();

      fetchAccounts(Session?.data.accessToken);
    };

    fetchData();
  }, []);

  const fetchAccounts = async (token) => {
    const response = await fetch(API_ACCOUNT_ADMIN_LOAD,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    await setAccounts(data.result);
  };
  const handleBanAccount = async (accountId: number) => {
    await fetch(API_ACCOUNT_BAN + `${accountId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session?.data.accessToken}`,
      },
    });
    fetchAccounts(session?.data.accessToken);
  };
  const handleUnbanAccount = async (accountId: number) => {
    await fetch(API_ACCOUNT_UNBAN + `${accountId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session?.data.accessToken}`,
      },
    });
    fetchAccounts(session?.data.accessToken);
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