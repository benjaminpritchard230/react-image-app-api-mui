import axios from "axios";
import { useEffect } from "react";
import PrivatePostCard from "./PrivatePostCard";

const PrivatePosts = ({ updatePosts, privatePostList }) => {
  useEffect(() => {
    updatePosts();
  }, []);

  const displayImagePosts = () => {
    return privatePostList.map((post) => (
      <PrivatePostCard post={post} updatePosts={updatePosts} key={post.id} />
    ));
  };
  return <>{displayImagePosts()}</>;
};

export default PrivatePosts;
