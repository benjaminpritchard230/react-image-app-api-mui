import PostCard from "./PostCard";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const PublicPosts = ({ updatePosts, publicPostList }) => {
  const postsUrl = "http://localhost:8000/all_posts/";
  const publicPosts = useSelector((state) => state.publicPosts);

  useEffect(() => {
    updatePosts();
  }, []);

  const displayImagePosts = () => {
    return publicPosts.posts.map((post) => (
      <PostCard post={post} updatePosts={updatePosts} key={post.id} />
    ));
  };
  return <>{displayImagePosts()}</>;
};

export default PublicPosts;
