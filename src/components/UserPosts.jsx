import PostCard from "./PostCard";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const UserPosts = ({ updatePosts, publicPostList }) => {
  const postsUrl = "http://localhost:8000/all_posts/";
  const { id } = useParams();
  const [userPostList, setUserPostList] = useState([]);

  const updateUserPosts = () => {
    axios
      .get(`http://localhost:8000/user/${id}/posts`, {
        headers: {},
      })
      .then((response) => {
        // console.log(page);

        console.log(response.data);
        setUserPostList(response.data);
        // setPublicPostCount(response.data.count);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {});
  };

  useEffect(() => {
    updateUserPosts();
  }, []);

  const displayImagePosts = () => {
    return userPostList.map((post) => (
      <PostCard post={post} updatePosts={updatePosts} key={post.id} />
    ));
  };
  return <>{displayImagePosts()}</>;
};

export default UserPosts;
