import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import authService from "../appwrite/auth";

export default function Post() {
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      setLoading(true);
      appwriteService
        .getPost(slug)
        .then((post) => {
          if (post) setPost(post);
          else navigate("/");
        })
        .catch((error) => {
          console.error("Error fetching post:", error);
          navigate("/");
        })
        .finally(() => {
          setLoading(false);
        });
    } else navigate("/");
  }, [slug, navigate]);



  const [authorName, setAuthorName] = useState('');


    

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  if (loading) {
    return (
      <div className="w-full py-8 bg-slate-900 text-white min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  return post ? (
    <div className="py-8 bg-slate-900 text-white">
      <Container>
        <div className="flex pr-4 items-center justify-end">
        <span>Created on {new Date(post.$createdAt).toLocaleDateString()}</span>
        </div>
        <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
          <img
            src={appwriteService.getFilePreview(post.featuredImage)}
            alt={post.title}
            className="rounded-xl"
          />

          {isAuthor && (
            <div className="absolute right-6 top-6">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-700" className="mr-3 hover:bg-green-900">
                  Edit
                </Button>
              </Link>
              <Button bgColor="bg-red-700" className="hover:bg-red-900" onClick={deletePost}>
                Delete
              </Button>
            </div>
          )}
        </div>
        <div className="w-full mb-6">
          <h1 className="text-2xl font-bold">{post.title}</h1>
        </div>
        <div className="browser-css">{parse(post.content)}</div>
        <div className="text-center text-xl font-semibold pt-7">Created by: {post.authorName || 'Unknown Author'}
            </div>
      </Container>
    </div>
  ) : null;
}
