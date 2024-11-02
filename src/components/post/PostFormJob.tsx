"use client";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { API_POST_ADD, API_POST_ADD_PHOTO } from "@/utils/api-links";
import Link from "next/link";
import PostPrivacyRadio from "../common/PostPrivacyRadio";
import { useRouter } from "next/navigation";

interface Props {}

const JobSchema = z.object({
  content: z.string().min(1, "Content is required"),
  link: z.any().optional(),
  skill: z.string().min(1, "Skill is required"),
  jobtTitle: z.string().min(1, "Job title is required"),
});

type PostFormData = z.infer<typeof JobSchema>;

const PostFormJob = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PostFormData>({
    resolver: zodResolver(JobSchema),
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
          categoryID: 1,
          hasPhoto: images? true:false,
          jobTitle: data.jobtTitle
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
      // Handle network errors
    }

    router.push("/job");
  };

  const [choiceType, setChoiceType] = useState(1);
  const [typeChecks, setTypeChecks] = useState([true, false]);

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
    <form onSubmit={handleSubmit(processForm)} className="space-y-4">
      <PostPrivacyRadio
        actionFunc={(v) => setChoiceType(v)}
        radChecks={typeChecks}
      ></PostPrivacyRadio>

      <div>
        <textarea
          {...register("content")}
          className="w-full p-2 border rounded"
          rows={12}
        />
        {errors.content && (
          <p className="text-red-500">{errors.content.message}</p>
        )}
      </div>
      <div>
        <input className="border-2" {...register("jobtTitle")} type="text" list="jobs" placeholder="Job title"/>
        <datalist id="jobs">
          {/* {caches.map((item, key) => (
            <option key={key} value={item.displayValue} />
          ))} */}
          <option value="Developer">Developer</option>
          <option value="Writer">Writer</option>
          <option value="Techlead">Techlead</option>
        </datalist>
        {errors.jobtTitle && (
          <p className="text-red-500">{errors.jobtTitle.message}</p>
        )}
      </div>
      <div>
        <select className="border-2"
          {...register("skill")}
          value={skill}
          onChange={(e) => {
            setSkill(e.target.value);
          }}
        >
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
          href="/job"
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

export default PostFormJob;
