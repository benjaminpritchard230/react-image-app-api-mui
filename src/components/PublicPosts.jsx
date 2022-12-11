import PostCard from "./PostCard";
import { useGetPublicPostsQuery } from "../features/api/apiSlice";

const PublicPosts = ({ updatePosts, page }) => {
  const {
    data: publicPostsData,
    error,
    isError,
    isLoading,
  } = useGetPublicPostsQuery(page);
  console.log(publicPostsData, "publicposts");

  const displayImagePosts = () => {
    if (!isLoading) {
      return publicPostsData.results.map((post) => (
        <PostCard post={post} updatePosts={updatePosts} key={post.id} />
      ));
    }
  };
  return <>{displayImagePosts()}</>;
};

export default PublicPosts;
