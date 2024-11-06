"use client";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { API_POST_ADD, API_POST_ADD_PHOTO, API_SKILL_LOAD } from "@/utils/api-links";
import Link from "next/link";
import PostPrivacyRadio from "../common/PostPrivacyRadio";
import { useRouter } from "next/navigation";



const PostSchema = z.object({
  content: z.string().min(1, "Content is required"),
  link: z.any().optional(),
  skill: z.string().optional(),
});

type PostFormData = z.infer<typeof PostSchema>;

const PostForm = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PostFormData>({
    resolver: zodResolver(PostSchema),
  });


  const [images, setImages] = useState([]);
  const uploadImage = () => {
    const file = event.target.files;
    // const formData = new FormData();
    // formData.append('image', file);

    console.log(file);
    setImages(file);
  };

  const processForm: SubmitHandler<PostFormData> = async (data) => {
    const formData = new FormData();
    
    // formData.append("Content", data.content);
    // const hasPhoto = !!data.link;
    // formData.append("HasPhoto", hasPhoto.toString());
    if (images) {
      formData.append("Link", images[0]);
    }

    try {
      console.log(JSON.stringify(images));
      const response = await fetch(API_POST_ADD, {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json;odata.metadata=minimal;odata.streaming=true",
          Authorization: `Bearer ${session?.data.accessToken}`,
        },
        body: JSON.stringify({
          content: data.content,
          privateLevel: choiceType,
          skills: data.skill,
          categoryID: 2,
          hasPhoto: images? true:false,
        }),
      });

      if (response.ok) {
        console.log("Post created successfully");
        const resData = await response.json();

        const responsePhoto = await fetch(API_POST_ADD_PHOTO + `${resData.data.postID}/photo`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${session?.data.accessToken}`,
          },
          body: formData,
        });
      } else {
        console.error("Failed to create post");
      }

      
      

    } catch (error) {
      console.error("Error:", error);
    }


    router.push("/post");
  };

  const [choiceType, setChoiceType] = useState(1);
  const [typeChecks, setTypeChecks] = useState([true, false]);
  const [listSkill, setlistSkill] = useState([]);

  useEffect(() => {
    
    const fetchSkill = async () => {
      const skRes = await fetch(API_SKILL_LOAD);
      const l6 = await skRes.json();
      await setlistSkill(l6.result);
    };

    fetchSkill();
  }, []);
  
  useEffect(() => {
    switch (choiceType) {
      case 1:
        setTypeChecks([true, false]);
        break;
      case 2:
        setTypeChecks([false, true]);
        break;
      default:
        console.log("Unexpected case in useEffect=" + choiceType);
        break;
    }
  }, [choiceType]);

  const [skill, setSkill] = useState("");
  return (
    <form onSubmit={handleSubmit(processForm)} encType="multipart/form-data" className="flex flex-col space-y-4 p-4 justify-center">
      <PostPrivacyRadio
        actionFunc={(v) => setChoiceType(v)}
        radChecks={typeChecks}
      ></PostPrivacyRadio>
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

      <div>
        <select
          {...register("skill")}
          value={skill}
          onChange={(e) => {
            setSkill(e.target.value);
          }}
        >
          {/* {listSkill?.map((a) => <option value={a.name}>{a.name}</option>)} */}
          <option value="Data Analysis">Data Analysis</option>
          <option value="Technical Writing">Technical Writing</option>
          <option value="Cloud Computing">Cloud Computing</option>
          <option value="Cybersecurity">Cybersecurity</option>
          <option value="Software Testing">Software Testing</option>
          <option value="Web Development">Web Development</option>
          <option value="HR">HR</option>
          <option value="Finnance">Finnance</option>
          <option value="Machine Learning">Machine Learning</option>
        </select>
        {errors.skill && <p className="text-red-500">{errors.skill.message}</p>}
      </div>
     
      <div>
        <input
          type="file"
          accept="image/png, image/gif, image/jpeg"
          className="w-full p-2 border rounded"
          onChange={uploadImage}
        />
      </div>
      <div className="d-flex flex-row flex-wrap justify-items-center">

        <Link
            href="/post"
            className="w-1/3 px-6  bg-gray-500 text-white p-2 rounded hover:bg-gray-600 disabled:bg-blue-300"
          >
            Cancel
          </Link>
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
