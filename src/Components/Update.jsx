import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
const Update = () => {
  const supabaseURL = import.meta.env.VITE_URL;
  const supabaseKEY = import.meta.env.VITE_API_KEY;
  const supabase = createClient(supabaseURL, supabaseKEY);
  const { id } = useParams();

  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const [postImage, setPostImage] = useState('');

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
    }
    getPost();
  }, [id]);

  const handleSubmit = async (event) => {
    let title = '';
    let content = '';
    let image = '';
    event.preventDefault();
    if (event.target.elements.title.value != '') {
      title = event.target.elements.title.value;
    } else {
      title = postTitle;
    }
    if (event.target.elements.content.value != '') {
      content = event.target.elements.content.value;
    } else {
      content = postContent;
    }
    if (event.target.elements.image.value != '') {
      image = event.target.elements.image.value;
    } else {
      image = postImage;
    }
    const { error } = await supabase
      .from('Posts')
      .update({
        Title: title,
        Content: content,
        Image: image,
      })
      .eq('id', id);
    alert('Post updated successfully, go back to home screen');
  };

  return (
    <div>
      <Navbar />
      <div className="creation">
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label>
              Title:
              <input type="text" name="title" />
            </label>
          </div>
          <div className="field">
            <label>
              Content:
              <input type="text" name="content" />
            </label>
          </div>
          <div className="field">
            <label>
              Image
              <input type="text" name="image" />
            </label>
          </div>
          <div>
            <input type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Update;
