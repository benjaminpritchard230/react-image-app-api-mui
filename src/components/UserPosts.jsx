import PostCard from "./PostCard";
import { useParams } from "react-router-dom";
import { useGetUserPostsQuery } from "../features/api/apiSlice";

const UserPosts = ({ updatePosts, publicPostList }) => {
  const postsUrl = "http://localhost:8000/all_posts/";
  const { id } = useParams();
  const {
    data: userPostsData,
    error,
    isError,
    isLoading,
  } = useGetUserPostsQuery(id);
  console.log(userPostsData, "userposts");

  const displayImagePosts = () => {
    if (!isLoading) {
      return userPostsData.map((post) => (
        <PostCard post={post} updatePosts={updatePosts} key={post.id} />
      ));
    }
  };
  return <>{displayImagePosts()}</>;
};

export default UserPosts;
