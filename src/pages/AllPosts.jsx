import React, { useState, useEffect } from "react";
import { Container, PostCard } from "../components";
import appwriteService from "../appwrite/config";


function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    appwriteService
      .getPosts([])
      .then((posts) => {
        if (posts) {
          setPosts(posts.documents);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="w-full py-8 bg-slate-900 text-white min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  if (posts.length == 0) {
    return (
        <div className="flex flex-wrap">
          <div className="p-2 w-full flex items-center h-screen justify-center flex-col gap-7">
            <h1 className="text-4xl font-bold text-white">No posts found...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full py-8 bg-slate-900 h-screen">
      <Container>
        <div className="flex flex-wrap ">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;
