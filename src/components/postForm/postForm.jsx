import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "../";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import authService from "../../appwrite/auth";

export default function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const [isUploading, setIsUploading] = useState(false);

  const submit = async (data) => {
    try {
      if (post && post.$id) {
        // Updating an existing post
        let fileId = post.featuredImage; // Keep the existing image by default

        // Only attempt to upload a new file if one is provided
        if (data.image && data.image[0]) {
          const file = await appwriteService.uploadFile(data.image[0]);
          if (file) {
            fileId = file.$id;
            // Delete the old file only if a new one was successfully uploaded
            await appwriteService.deleteFile(post.featuredImage);
          }
        }

        const currentUser = await authService.getCurrentUser();
        const authorName = currentUser ? currentUser.name : "Unknown Author";

        const dbPost = await appwriteService.updatePost(post.$id, {
          ...data,
          featuredImage: fileId,
          authorName: authorName, // Add author name to the update
        });

        //////////////

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      } else {
        // Creating a new post
        if (data.image && data.image[0]) {
          const file = await appwriteService.uploadFile(data.image[0]);
          if (file) {
            const fileId = file.$id;
            data.featuredImage = fileId;

            // Get the current user's name
            const currentUser = await authService.getCurrentUser();
            const authorName = currentUser
              ? currentUser.name
              : "Unknown Author";

            const dbPost = await appwriteService.createPost({
              ...data,
              userId: userData.$id,
              authorName: authorName, // Add author name to the new post
            });
            if (dbPost) {
              navigate(`/post/${dbPost.$id}`);
            }
          }
        } else {
          // Handle case where no image is provided for a new post
          // Get the current user's name
          const currentUser = await authService.getCurrentUser();
          const authorName = currentUser ? currentUser.name : 'Unknown Author';

          const dbPost = await appwriteService.createPost({ 
            ...data, 
            userId: userData.$id,
            authorName: authorName, // Add author name to the new post
          });
          if (dbPost) {
            navigate(`/post/${dbPost.$id}`);
          }
        }
      }
    } catch (error) {
      console.error("Error handling post submission:", error);
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="w-1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
        {isUploading && (
          <div className="w-full mb-4">
            <div className="bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            <p className="text-center mt-2">{uploadProgress}% Uploaded</p>
          </div>
        )}
        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full hover:bg-blue-800"
          disabled={isUploading}
        >
          {isUploading ? "Uploading..." : post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}
