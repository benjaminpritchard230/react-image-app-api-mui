import { useEffect } from "react";
import PrivatePostCard from "./PrivatePostCard";
import { useGetPrivatePostsQuery } from "../features/api/apiSlice";
import { useSelector } from "react-redux";
const PrivatePosts = ({ updatePosts, privatePostList }) => {
  const auth = useSelector((state) => state.auth);
  const token = auth.token;
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
    if (!isLoading && privatePostsData) {
      return privatePostsData.map((post) => (
        <PrivatePostCard post={post} updatePosts={updatePosts} key={post.id} />
      ));
    }
  };
  return <>{displayImagePosts()}</>;
};

export default PrivatePosts;
