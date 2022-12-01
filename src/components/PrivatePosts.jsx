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

const PrivatePosts = ({ updatePrivatePosts, privatePostList }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const token = user.token;
  const navigate = useNavigate();
  // console.log(token);

  const postsUrl = "http://localhost:8000/my_posts/";
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    updatePrivatePosts();
  }, []);

  const displayImagePosts = () => {
    return privatePostList.map((post) => (
      <PostCard
        post={post}
        updatePrivatePosts={updatePrivatePosts}
        key={post.id}
      />
    ));
  };
  return <>{displayImagePosts()}</>;
};

export default PrivatePosts;
