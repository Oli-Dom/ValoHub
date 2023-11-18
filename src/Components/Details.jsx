import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { React, useEffect, useState } from 'react';
import { FiEdit, FiTrash } from 'react-icons/Fi';
import { SlLike } from 'react-icons/Sl';
import { Link, RouterProvider, useParams } from 'react-router-dom';
import Navbar from './Navbar';
const Details = () => {
  const { id } = useParams();
  const supabaseURL = import.meta.env.VITE_URL;
  const supabaseKEY = import.meta.env.VITE_API_KEY;
  const supabase = createClient(supabaseURL, supabaseKEY);

  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const [postImage, setPostImage] = useState('');
  const [postId, setPostId] = useState(0);
  const [votes, setVotes] = useState(0);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    async function getPost() {
      const { data, error } = await supabase
        .from('Posts')
        .select()
        .eq('id', id);
      if (error) {
        console.warn(error);
      }

      setPostTitle(data[0].Title);
      setPostContent(data[0].Content);
      setPostImage(data[0].Image);
      setPostId(data[0].id);
      setVotes(data[0].up_votes);
      setComments(data[0].CommentArray);
    }
    getPost();
  }, [id]);

  const handleDelete = async () => {
    const confirmation = await confirm(
      'Are you sure you want to delete this post?'
    );

    if (confirmation) {
      const { error } = await supabase.from('Posts').delete().eq('id', id);
    }
  };

  const getComments = (commentList) => {
    if (commentList != null) {
      return commentList.map((post) => {
        return (
          <div>
            <h3 className="comments">{post}</h3>
          </div>
        );
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let newComments = [];
    if (comments != null) {
      newComments = [...comments, event.target.elements.comment.value];
    } else {
      newComments = [event.target.elements.comment.value];
    }
    const { error } = await supabase
      .from('Posts')
      .update({
        CommentArray: newComments,
      })
      .eq('id', id);

    const { data } = await supabase.from('Posts').select().eq('id', id);
    if (error) {
      console.warn(error);
    }

    setPostTitle(data[0].Title);
    setPostContent(data[0].Content);
    setPostImage(data[0].Image);
    setPostId(data[0].id);
    setVotes(data[0].up_votes);
    setComments(data[0].CommentArray);
  };

  const decideImage = () => {
    if (postImage.length > 0) {
      return (
        <div>
          <Navbar />
          <div className="post-container">
            <div className="postdetails">
              <h2>{postTitle}</h2>
              <h2 className="content">{postContent}</h2>
              <img src={postImage} />
              <div className="buttons">
                <SlLike onClick={handleUpVote} /> {votes}
                <Link
                  to={`/post/update/${postId}`}
                  style={{ textDecoration: 'none', color: 'black' }}
                  key={postId}
                >
                  <FiEdit />
                </Link>
                <FiTrash onClick={handleDelete} />
              </div>
              <div className="comment-container">{getComments(comments)}</div>
              <div className="comment-form">
                <form onSubmit={handleSubmit}>
                  <label>Leave Comment</label>
                  <input type="text" name="comment"></input>
                  <label></label>
                  <input type="submit" />
                </form>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <Navbar />
          <div className="post-container">
            <div className="postdetails">
              <h2>{postTitle}</h2>
              <h2 className="content">{postContent}</h2>

              <div className="buttons">
                <SlLike onClick={handleUpVote} /> {votes}
                <Link
                  to={`/post/update/${postId}`}
                  style={{ textDecoration: 'none', color: 'black' }}
                  key={postId}
                >
                  <FiEdit />
                </Link>
                <FiTrash onClick={handleDelete} />
              </div>
              <div className="comment-container">{getComments(comments)}</div>
              <div className="comment-form">
                <form onSubmit={handleSubmit}>
                  <label>Leave Comment</label>
                  <input type="text" name="comment"></input>
                  <label></label>
                  <input type="submit" />
                </form>
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  const handleUpVote = async () => {
    const { error } = await supabase
      .from('Posts')
      .update({ up_votes: votes + 1 })
      .eq('id', id);

    const { data } = await supabase.from('Posts').select().eq('id', id);
    setVotes(data[0].up_votes);
  };

  return <div>{decideImage()}</div>;
};

export default Details;
