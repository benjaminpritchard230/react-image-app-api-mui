import axios from "axios";
import { useEffect } from "react";
import PrivatePostCard from "./PrivatePostCard";

const PrivatePosts = ({ updatePrivatePosts, privatePostList }) => {
  useEffect(() => {
    updatePrivatePosts();
  }, []);

  const displayImagePosts = () => {
    return privatePostList.map((post) => (
      <PrivatePostCard
        post={post}
        updatePrivatePosts={updatePrivatePosts}
        key={post.id}
      />
    ));
  };
  return <>{displayImagePosts()}</>;
};

export default PrivatePosts;
