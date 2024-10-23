import Link from "next/link";
import AccountList from "../account/AccountList";
import ProfilePortrait from "../profile/ProfilePortrait";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex justify-center bg-gray-200 gap-4">
        <div className="mt-10 w-1/4">
            <ProfilePortrait></ProfilePortrait>
        </div>
        
        <section className="w-2/3 bg-white min-h-screen">
          <div className="top-0 z-3 -mt-px flex justify-around bg-white tablet:top-0 tablet:justify-start laptop:top-14 NavBar_nav__btnaf">
            <div className="w-1/6">
              <Link
                href="/profile"
                aria-pressed="true"
                className="w-full btn focus-outline inline-flex cursor-pointer select-none flex-row items-center border no-underline shadow-none transition duration-200 ease-in-out typo-callout justify-center font-bold h-10 px-5 rounded-12 btn-tertiary"
              >
                About
              </Link>
              <div className="bottom-0 w-4 absolute inset-x-0 bottom-0 h-0.5 my-0 mx-auto bg-text-primary utilities_activeTabIndicator__cVDB_"></div>
            </div>
            <div className="w-1/6">
              <Link
                href="/profile/post"
                aria-pressed="false"
                className="w-full btn focus-outline inline-flex cursor-pointer select-none flex-row items-center border no-underline shadow-none transition duration-200 ease-in-out typo-callout justify-center font-bold h-10 px-5 rounded-12 btn-tertiary"
              >
                Posts
              </Link>
            </div>
            <div className="w-1/6">
              <Link
                href="/profile/comment"
                aria-pressed="false"
                className="w-full btn focus-outline inline-flex cursor-pointer select-none flex-row items-center border no-underline shadow-none transition duration-200 ease-in-out typo-callout justify-center font-bold h-10 px-5 rounded-12 btn-tertiary"
              >
                Comments
              </Link>
            </div>
            <div className="w-1/6">
              <Link
                href="/profile/like"
                aria-pressed="false"
                className="w-full btn focus-outline inline-flex cursor-pointer select-none flex-row items-center border no-underline shadow-none transition duration-200 ease-in-out typo-callout justify-center font-bold h-10 px-5 rounded-12 btn-tertiary"
              >
                Likes
              </Link>
            </div>
            <div className="w-1/6">
              <Link
                href="/profile/connection"
                aria-pressed="false"
                className="w-full btn focus-outline inline-flex cursor-pointer select-none flex-row items-center border no-underline shadow-none transition duration-200 ease-in-out typo-callout justify-center font-bold h-10 px-5 rounded-12 btn-tertiary"
              >
                Connections
              </Link>
            </div>
            <div className="w-1/6">
              <Link
                href="/profile/group"
                aria-pressed="false"
                className="w-full btn focus-outline inline-flex cursor-pointer select-none flex-row items-center border no-underline shadow-none transition duration-200 ease-in-out typo-callout justify-center font-bold h-10 px-5 rounded-12 btn-tertiary"
              >
                Group
              </Link>
            </div>
          </div>
          <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
            {children}
          </div>
        </section>
      </div>
    </>
  );
}
