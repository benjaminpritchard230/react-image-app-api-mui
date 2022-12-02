import axios from "axios";
import PostCard from "./PostCard";
import { useEffect } from "react";

const PrivatePosts = ({ updatePrivatePosts, privatePostList }) => {
  useEffect(() => {
    updatePrivatePosts();
  }, []);

  const displayImagePosts = () => {
    return privatePostList.map((post) => (
      <PostCard
        post={post}
        updatePrivatePosts={updatePrivatePosts}
        key={post.id}
      />
    ));
  };
  return <>{displayImagePosts()}</>;
};

export default PrivatePosts;
