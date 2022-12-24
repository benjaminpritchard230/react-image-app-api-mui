import { useGetPostCommentsQuery } from "../features/api/apiSlice";
import CommentDisplay from "./CommentDisplay";
import { useRef, useEffect } from "react";

const CommentsList = ({ post }) => {
  const {
    data: postCommentsData,

    isLoading,
  } = useGetPostCommentsQuery(post.id);

  const displayComments = () => {
    if (!isLoading) {
      return postCommentsData.map((comment) => (
        <CommentDisplay comment={comment} key={comment.id} />
      ));
    }
  };
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView(false);
  };

  useEffect(() => {
    scrollToBottom();
  }, [postCommentsData]);

  return <div ref={messagesEndRef}>{displayComments()}</div>;
};

export default CommentsList;
