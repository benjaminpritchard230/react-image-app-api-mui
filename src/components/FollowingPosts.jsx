import PostCard from "./PostCard";
import { useGetFollowingPostsQuery } from "../features/api/apiSlice";
import { useSelector } from "react-redux";

const FollowingPosts = ({}) => {
  const {
    data: followingPostsData,
    error,
    isError,
    isLoading,
  } = useGetFollowingPostsQuery();
  console.log(followingPostsData, "followin' posts");
  const auth = useSelector((state) => state.auth);
  const token = auth.token;
  const displayImagePosts = () => {
    if (token.length > 0 && !isLoading) {
      return followingPostsData.map((post) => (
        <PostCard post={post} key={post.id} isPrivate={false} />
      ));
    }
  };
  return <>{displayImagePosts()}</>;
};

export default FollowingPosts;
