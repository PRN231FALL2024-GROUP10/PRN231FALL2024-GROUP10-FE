import Link from "next/link";
import AccountList from "../account/AccountList";

export default function PostCreateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex justify-evenly">
        <section className="w-2/3">
          <div className="sticky top-0 z-3 -mt-px flex justify-around bg-white tablet:top-0 tablet:justify-start laptop:top-14 NavBar_nav__btnaf">
            <div className="w-1/2">
              <Link
                href="/post/create"
                aria-pressed="true"
                className="w-full btn focus-outline inline-flex cursor-pointer select-none flex-row items-center border no-underline shadow-none transition duration-200 ease-in-out typo-callout justify-center font-bold h-10 px-5 rounded-12 btn-tertiary"
              >
                General
              </Link>
              <div className="bottom-0 w-4 absolute inset-x-0 bottom-0 h-0.5 my-0 mx-auto bg-text-primary utilities_activeTabIndicator__cVDB_"></div>
            </div>
            <div className="w-1/2">
              <Link
                href="/job/create"
                aria-pressed="false"
                className="w-full btn focus-outline inline-flex cursor-pointer select-none flex-row items-center border no-underline shadow-none transition duration-200 ease-in-out typo-callout justify-center font-bold h-10 px-5 rounded-12 btn-tertiary"
              >
                Job
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
