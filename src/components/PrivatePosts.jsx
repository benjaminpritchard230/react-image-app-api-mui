import { useEffect } from "react";
import PrivatePostCard from "./PrivatePostCard";
import { useGetPrivatePostsQuery } from "../features/api/apiSlice";
import { useSelector } from "react-redux";
const PrivatePosts = ({ privatePostList }) => {
  const auth = useSelector((state) => state.auth);
  const token = auth.token;
  const {
    data: privatePostsData,
    error,
    isError,
    isLoading,
  } = useGetPrivatePostsQuery();
  console.log(privatePostsData, "ppd");

  const displayImagePosts = () => {
    if (!isLoading && privatePostsData) {
      return privatePostsData.map((post) => (
        <PrivatePostCard post={post} key={post.id} />
      ));
    }
  };
  return <>{displayImagePosts()}</>;
};

export default PrivatePosts;
