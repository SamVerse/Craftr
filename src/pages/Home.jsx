import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";
import { useSelector } from "react-redux";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const authStatus = useSelector((state) => state.auth.status);
  const userId = useSelector((state) => state.auth.userData?.$id);

  useEffect(() => {
    setLoading(true);
    appwriteService.getAllPosts()
    .then((posts) => {
      if (posts && posts.documents) {
        const userPosts = posts.documents.filter((post) => post.userId === userId);
        setPosts(userPosts);
      } else {
        console.log("No posts found or unexpected response structure");
        setPosts([]);
      }
    }).finally(() => {
      setLoading(false)
    })


  }, [userId ,authStatus]);

  if (loading) {
    return (
      <div className="w-full mt-12 text-center text-white h-screen">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full flex items-center justify-center flex-col gap-7">
              <h1 className="text-4xl font-bold">Loading posts...</h1>
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-white"></div>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  if (posts.length === 0) {
    if (authStatus) {
      return (
        <div className="w-full mt-12 text-center text-white h-auto">
          <Container>
            <div className="flex flex-wrap">
              <div className="p-2 w-full">
                <h1 className="text-4xl font-bold h-screen hover:text-gray-400">
                  No posts available. Create your first post! 📝
                </h1>
              </div>
            </div>
          </Container>
        </div>
      );
    } else {
      return (
        <div className="w-full mt-12 text-center text-white h-auto">
          <Container>
            <div className="flex flex-wrap">
              <div className="p-2 w-full">
                <h1 className="text-4xl font-bold h-screen hover:text-gray-400">
                  Login to read posts 😎
                </h1>
              </div>
            </div>
          </Container>
        </div>
      );
    }
  }

  return (
    <div className="w-full h-screen py-8 bg-slate-900">
      <Container>
        <div className="text-white mb-11 font-medium text-[20px] underline">Your posts</div>
        <div className="flex flex-wrap]">
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

export default Home;
