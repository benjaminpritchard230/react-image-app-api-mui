import PostCard from "./PostCard";
import { useEffect } from "react";

const PublicPosts = ({ updatePosts, publicPostList }) => {
  const postsUrl = "http://localhost:8000/all_posts/";

  useEffect(() => {
    updatePosts();
  }, []);

  const displayImagePosts = () => {
    return publicPostList.map((post) => (
      <PostCard post={post} updatePosts={updatePosts} key={post.id} />
    ));
  };
  return <>{displayImagePosts()}</>;
};

export default PublicPosts;
