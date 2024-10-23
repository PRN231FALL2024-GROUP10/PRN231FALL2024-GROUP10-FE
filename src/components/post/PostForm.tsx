import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { API_POST_ADD } from "@/utils/api-links";
import Link from "next/link";
import { useRouter } from "next/router";


const PostSchema = z.object({
  content: z.string().min(1, "Content is required"),
  link: z.any().optional(),
  categoryId: z.number().default(2)
});

type PostFormData = z.infer<typeof PostSchema>;

const PostForm = ({ onPostCreated }) => {
  const { data: session } = useSession();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PostFormData>({
    resolver: zodResolver(PostSchema),
  });

  const processForm: SubmitHandler<PostFormData> = async (data) => {
    const formData = new FormData();
    
    formData.append("Content", data.content);
    const hasPhoto = !!data.link;
    formData.append("HasPhoto", hasPhoto.toString());
    if (data.link) {
      formData.append("Link", data.link);
    }

    try {
      const response = await fetch(API_POST_ADD, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session?.data.accessToken}`,
        },
        body: formData,
      });

      if (response.ok) {
        console.log("Post created successfully");
        reset();
        onPostCreated;
      } else {
        console.error("Failed to create post");
        // Handle error (e.g., show error message)
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle network errors
    }
  };
  return (
    <form onSubmit={handleSubmit(processForm)} className="flex flex-col space-y-4 p-4 justify-center">
      <div>
        <textarea
          {...register("content")}
          placeholder="What's on your mind?"
          className="w-full p-2 border rounded"
          rows={12}
        />
        {errors.content && (
          <p className="text-red-500">{errors.content.message}</p>
        )}
      </div>

      {/* <div>
        {errors.content && (
          <p className="text-red-500">{errors.content.message}</p>
        )}
      </div>
      
      <div>
        {errors.content && (
          <p className="text-red-500">{errors.content.message}</p>
        )}
      </div> */}
     
      <div>
        <input
          type="file"
          {...register("link")}
          className="w-full p-2 border rounded"
        />
        {errors.link && <p className="text-red-500">{errors.link.message}</p>}
      </div>
      <div className="d-flex flex-row flex-wrap justify-items-center">
        <button onClick={onPostCreated} className="w-1/3 px-6  bg-gray-500 text-white p-2 rounded hover:bg-gray-600 disabled:bg-blue-300">
          Cancel
        </button>
        
        <button
          type="submit"
          className="w-1/3 bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
        >
          {isSubmitting ? "Posting..." : "Post"}
        </button>
      </div>
    </form>
  );
};

export default PostForm;
