import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "@/components/Provider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaBell, FaBriefcase, FaSignOutAlt, FaUser, FaUsers } from "react-icons/fa";
import { API_COMPANY_LOAD, API_JOB_TITLE_LOAD, API_POST_TYPE_LOAD, API_SCHOOL_LOAD, API_SKILL_LOAD, API_TIMEU_LOAD } from "@/utils/api-links";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: {
    absolute: "",
    default: "WSocial",
    template: "%s | WSocial"
  },
  description: "Generated by create next app",
};

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const jtRes = await fetch(API_JOB_TITLE_LOAD);
  // const l1 = await jtRes.json();
  // const scRes = await fetch(API_SCHOOL_LOAD);
  // const l2 = await scRes.json();
  // const cpRes = await fetch(API_COMPANY_LOAD);
  // const l3 = await cpRes.json();
  // const tuRes = await fetch(API_TIMEU_LOAD);
  // const l4 = await tuRes.json();
  // // const ptRes = await fetch(API_POST_TYPE_LOAD);
  // // const l5 = await ptRes.json();
  // const skRes = await fetch(API_SKILL_LOAD);
  // const l6 = await skRes.json();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
        <Header></Header>
          {children}
        </Providers>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable={false}
          pauseOnHover={false}
        />      
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
      </body>

    </html>
  );
}
