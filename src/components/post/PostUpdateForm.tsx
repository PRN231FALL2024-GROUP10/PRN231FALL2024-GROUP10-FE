import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { API_POST_ADD, API_POST_LOAD, API_POST_UPDATE } from "@/utils/api-links";

interface Props {

}

const PostSchema = z.object({
  content: z.string().min(1, "Content is required"),
  link: z.any().optional(),
});

type PostFormData = z.infer<typeof PostSchema>;

const PostUpdateForm = ({ postId, onPostCreated } : Props) => {
  const { data: session } = useSession();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PostFormData>({
    resolver: zodResolver(PostSchema),
  });

  const [posts, setPosts] = useState();
  useEffect(() => {
    fetchPosts();
  }, [postId]);

  const fetchPosts = async () => {
    try {
      const response = await fetch(
        API_POST_LOAD
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      const post = data.reverse();
      setPosts(post);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const processForm: SubmitHandler<PostFormData> = async (data) => {
    const formData = new FormData();
    formData.append("Content", data.content);
    const hasPhoto = !!data.link;
    formData.append("HasPhoto", hasPhoto.toString());
    if (data.link) {
      formData.append("Link", data.link);
    }

    try {
      const response = await fetch(
        API_POST_UPDATE + `/${postId}/UpdatePost`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${session?.data.accessToken}`,
          },
          body: formData,
        }
      );

      if (response.ok) {
        console.log("Post created successfully");
        reset();
        onPostCreated();
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
    <form onSubmit={handleSubmit(processForm)} className="space-y-4">
      //content
      <div>
        <textarea
          {...register("content")}
          placeholder={posts.Content}
          className="w-full p-2 border rounded"
          rows={4}
        />
        {errors.content && (
          <p className="text-red-500">{errors.content.message}</p>
        )}
      </div>
      
      if(posts.Category === 2){
        
        <div>
            //choose job title
            <div>
                //drop down post job title
                {errors.content && (
                <p className="text-red-500">{errors.content.message}</p>
                )}
            </div>

            //choose job skill
            <div>
                //post job skill
                {errors.content && (
                <p className="text-red-500">{errors.content.message}</p>
                )}
            </div>
        </div>
      }
      
      <div>
        <input
          type="file"
          {...register("link")}
          className="w-full p-2 border rounded"
        />
        {errors.link && <p className="text-red-500">{errors.link.message}</p>}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
      >
        {isSubmitting ? "Posting..." : "Post"}
      </button>
    </form>
  );
};

export default PostUpdateForm;
