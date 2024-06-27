import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";
import { useSelector } from "react-redux";
import fetchUser from "../appwrite/auth";
import { Link } from "react-router-dom";
import Button from "../components/Button";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const authStatus = useSelector((state) => state.auth.status);
  const userId = useSelector((state) => state.auth.userData?.$id);
  const [userName, setUserName] = useState("");

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  useEffect(() => {
    setLoading(true);

    Promise.all([appwriteService.getAllPosts(), fetchUser.getCurrentUser()])
      .then(([postsResponse, userResponse]) => {
        if (postsResponse && postsResponse.documents) {
          const userPosts = postsResponse.documents.filter(
            (post) => post.userId === userId
          );
          setPosts(userPosts);
        } else {
          console.log("No posts found or unexpected response structure");
          setPosts([]);
        }

        if (userResponse) {
          setUserName(userResponse.name);
        } else {
          console.log("User information not found");
          setUserName("");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
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
              <div className="p-2 w-[80%] flex flex-col gap-10 mx-auto h-screen overflow-x-auto">
                <h1 className="text-4xl font-bold hover:text-gray-400">
                  Login to read posts 😎
                </h1>
                <div className="text-lg text-white">
                  "Hi guys, I am Sameer Singh and i have made craftr 🎨️️️️️️️,
                  A Blogging website to share your thoughts and stories through
                  visual posts 📸, Sign up or log in to start exploring and
                  showcasing your creativity, ( it's responsive for smaller screens as well ) and if you have any suggestions or
                  feedbacks u can contact me through my linkedin!"{" "}
                </div>
                <div className="pt-3 flex-col items-start  flex gap-1">
                  <span className="text-4xl font-semibold">Want to know how to use?</span>
                  <span className="text-lg pb-3 underline">It's quite Simple actually:</span>
                  <span>1) SIGNUP.. Create your account (Be sure to remember your credentials afterwards)</span>
                  <span className="py-4">AND THAT'S IT YOU WILL THEN BE ABLE TO SEE THE MAIN CONTENT !!</span>
                  <span>2) <span className="text-[20px]"> U have now gained access to: </span> </span>
                  <span> <span className="font-extrabold text-base text-yellow-400">Home </span>, where you can see and edit posts made by you.</span>
                  <span> <span className="font-extrabold text-base text-pink-300">Global Feed</span> where you can see posts made by others including yours.  </span> 
                  <span> <span className="font-extrabold text-base text-emerald-500">Add posts </span> this is from where u can create posts. </span>
                  <span> ( The editor used here is not the normal text editor its from Tinymce, which offers quite a lot of formatting tools. ) </span>
                </div>
                <div className="font-bold text-xl">I hope you will like it.. ;)</div>
              </div>
            </div>
          </Container>
        </div>
      );
    }
  }

  return (
    <div className="w-full h-screen py-8 bg-slate-900">
      {/* <Container>
        <div className="flex flex-col items-center w-full h-screen">
          <div className="text-white mb-7 font-medium text-[20px] underline">
          Your shares
          </div>
          <div className=" mb-8 w-full overflow-x-auto">
            {posts.map((post) => (
              <div
                key={post.$id}
                className="sm:flex-shrink-0  mb-3 w-full  p-2"
              >
                <div className="flex md:min-w-[30vw] items-center justify-between">
                <PostCard {...post} />
                <div className="text-white text-sm md:text-lg w-full">Created on {new Date(post.$createdAt).toLocaleDateString()}</div>
              
                </div>
                </div>
            ))}
          </div>
        </div>
      </Container> */}
      <Container>
        <div className="flex flex-col items-center w-full h-screen">
          <div className="text-white mb-7 font-medium text-[20px] underline">
            Your shares
          </div>
          <div className="mb-8 w-full overflow-x-auto">
            {posts.map((post) => (
              <div key={post.$id} className="mb-3 w-full p-2">
                <div className="flex gap-2 items-center px-2 justify-between w-full">
                  <div className="flex-grow md:w-[40%]">
                    <PostCard {...post} />
                  </div>
                  <div className="text-white w-[80%] font-light text-sm md:text-lg ml-4 ">
                    <span>
                      Created on{" "}
                      {new Date(post.$createdAt).toLocaleDateString()} <br />
                    </span>
                    <span className="text-[9px] ml-auto md:text-[12px]">
                      at {new Date(post.$createdAt).toLocaleTimeString()}{" "}
                    </span>
                  </div>
                  <div className="update hidden md:block">
                    <div className="flex">
                      <Link to={`/edit-post/${post.$id}`}>
                        <Button
                          bgColor="bg-green-700"
                          className="mr-3 hover:bg-green-900"
                        >
                          Edit
                        </Button>
                      </Link>
                      <Button
                        bgColor="bg-red-700"
                        className="hover:bg-red-900"
                        onClick={deletePost}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Home;
