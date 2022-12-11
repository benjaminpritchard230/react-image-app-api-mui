import axios from "axios";
import { useEffect } from "react";
import PrivatePostCard from "./PrivatePostCard";
import { useGetPrivatePostsQuery } from "../features/api/apiSlice";

const PrivatePosts = ({ updatePosts, privatePostList }) => {
  const {
    data: privatePostsData,
    error,
    isError,
    isLoading,
  } = useGetPrivatePostsQuery();
  console.log(privatePostsData, "ppd");
  useEffect(() => {
    updatePosts();
  }, []);

  const displayImagePosts = () => {
    if (!isLoading) {
      return privatePostsData.map((post) => (
        <PrivatePostCard post={post} updatePosts={updatePosts} key={post.id} />
      ));
    }
  };
  return <>{displayImagePosts()}</>;
};

export default PrivatePosts;
