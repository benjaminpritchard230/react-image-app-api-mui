import PostCard from "./PostCard";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectAllPosts,
  fetchPosts,
} from "../features/publicPosts/publicPostsSlice";

const PublicPosts = ({ updatePosts, publicPostList }) => {
  const dispatch = useDispatch();

  const postsUrl = "http://localhost:8000/all_posts/";
  const publicPosts = useSelector(selectAllPosts);
  const postStatus = useSelector((state) => state.posts.status);

  useEffect(() => {
    updatePosts();
  }, []);

  useEffect(() => {
    if (postStatus === "idle") {
      dispatch(fetchPosts());
    }
  }, [postStatus, dispatch]);

  const displayImagePosts = () => {
    if (postStatus === "succeeded") {
      return publicPosts[0].results.map((post) => (
        <PostCard post={post} updatePosts={updatePosts} key={post.id} />
      ));
    }
  };
  return <>{displayImagePosts()}</>;
};

export default PublicPosts;
