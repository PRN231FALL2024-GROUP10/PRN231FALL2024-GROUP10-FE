import Link from "next/link";
import AccountList from "../account/AccountList";
import { AccountListSearch } from "../account/AccountListSearch";
import { PostListSearch } from "../post/PostListSearch";
import { JobListSearch } from "../post/JobListSearch";

export default function SearchLayout({
  search
}) {
  return (
    <>
      <div className="flex justify-evenly">
      
        <section className="w-2/3">
        <h1><b>Search Results</b></h1>
          <h1>Accounts</h1>
          <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
            <AccountListSearch search={search}></AccountListSearch>
          </div>
          <hr />

          <h1>Posts</h1>
          <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
            <PostListSearch search={search}></PostListSearch>
          </div>
          <hr />
          <h1>Jobs</h1>
          <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
            <JobListSearch search={search}></JobListSearch>
          </div>
          
        </section>
      </div>
    </>
  );
}
