import axios from "axios";
import PostCard from "./PostCard";
import { useState, useEffect } from "react";

const PublicPosts = ({ updatePublicPosts, publicPostList }) => {
  const postsUrl = "http://localhost:8000/all_posts/";

  useEffect(() => {
    updatePublicPosts();
  }, []);

  const displayImagePosts = () => {
    return publicPostList.map((post) => (
      <PostCard
        post={post}
        updatePublicPosts={updatePublicPosts}
        key={post.id}
      />
    ));
  };
  return <>{displayImagePosts()}</>;
};

export default PublicPosts;
