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
    appwriteService
      .getAllPosts()
      .then((posts) => {
        if (posts && posts.documents) {
          const userPosts = posts.documents.filter(
            (post) => post.userId === userId
          );
          setPosts(userPosts);
        } else {
          console.log("No posts found or unexpected response structure");
          setPosts([]);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [userId, authStatus]);

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
            <div className="flex flex-wrap h-screen">
              <div className="p-2 w-full">
                <h1 className="text-4xl font-bold hover:text-gray-400">
                  No posts available. Create your first post! 📝
                </h1>
                <h3 className="font-semibold pt-3 text-base text-gray-400">
                  Please refresh if you have already made a post and it is not
                  visible..Be patient (;
                </h3>
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
        <div className="flex flex-col items-center w-full h-screen">
          <div className="text-white mb-7 font-medium text-[20px] underline">
            Your posts
          </div>
          <div className="md:flex md:flex-wrap mb-8 w-full overflow-x-auto">
            {posts.map((post) => (
              <div
                key={post.$id}
                className="sm:flex-shrink-0 mb-3 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2"
              >
                <PostCard {...post} />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Home;
