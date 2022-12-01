import axios from "axios";
import PostCard from "./PostCard";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateUsername,
  updateToken,
  clearUser,
} from "../features/user/userSlice";
import { useNavigate, Link } from "react-router-dom";

const PrivatePosts = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const token = user.token;
  const navigate = useNavigate();
  // console.log(token);

  const postsUrl = "http://localhost:8000/my_posts/";
  const [postList, setPostList] = useState([]);

  const updatePosts = () => {
    axios
      .get(postsUrl, {
        headers: { Authorization: `Token ${token}` },
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

export default PrivatePosts;
