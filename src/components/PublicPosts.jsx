import axios from "axios";
import PostCard from "./PostCard";
import { useState, useEffect } from "react";

const PublicPosts = () => {
  const postsUrl = "http://localhost:8000/all_posts/";
  const [postList, setPostList] = useState([]);

  const updatePosts = () => {
    axios
      .get(postsUrl, {
        headers: {},
      })
      .then((response) => {
        console.log(response.data);
        setPostList(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {});
  };
  useEffect(() => {
    updatePosts();
  }, []);

  const displayImagePosts = () => {
    return postList.map((post) => (
      <PostCard post={post} updatePosts={updatePosts} key={post.id} />
    ));
  };
  return <>{displayImagePosts()}</>;
};

export default PublicPosts;
