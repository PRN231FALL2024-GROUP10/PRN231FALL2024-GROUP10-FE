"use client";

import { useState } from "react";
import PostForm from "./PostForm";


const PostPopup = ({ key, onPostCreated }) => {
  return (
      <div
        data-dialog-backdrop="web-3-modal"
        data-dialog-backdrop-close="true"
        className="absolute left-0 inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-10 backdrop-blur-sm transition-opacity "
      >
        <div
          className="relative m-4 rounded-lg bg-white shadow-sm h-1/2 w-1/2"
          data-dialog="web-3-modal"
        >
          <PostForm onPostCreated={onPostCreated}>
          </PostForm>
        </div>
      </div>
  );
};

export default PostPopup;
