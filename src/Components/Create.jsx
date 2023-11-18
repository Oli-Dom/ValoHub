import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import React from 'react';
import Navbar from './Navbar';
const Create = () => {
  const supabaseURL = import.meta.env.VITE_URL;
  const supabaseKEY = import.meta.env.VITE_API_KEY;
  const supabase = createClient(supabaseURL, supabaseKEY);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const title = event.target.elements.title.value;
    const content = event.target.elements.content.value;
    const image = event.target.elements.image.value;
    const { error } = await supabase.from('Posts').insert({
      Title: title,
      Content: content,
      Image: image,
    });
    alert('Post created successfully, go back to home screen');
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

export default Create;
