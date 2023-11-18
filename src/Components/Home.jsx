import { createClient } from '@supabase/supabase-js';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

const Home = () => {
  const [posts, setPosts] = useState([]);

  const supabaseURL = import.meta.env.VITE_URL;
  const supabaseKEY = import.meta.env.VITE_API_KEY;
  const supabase = createClient(supabaseURL, supabaseKEY);

  useEffect(() => {
    async function getPosts() {
      const { data, error } = await supabase.from('Posts').select();
      if (error) {
        console.warn(error);
      }
      setPosts(data);
    }
    getPosts();
  }, []);

  const display = (postList) => {
    if (!postList.length) {
      return <div>Loading...</div>;
    }

    return postList.map((post) => {
      const parsedDate = new Date(post.created_at);
      const difference = Date.now() - parsedDate.valueOf();
      const hoursAgo = difference / (1000 * 60 * 60);
      const daysAgo = Math.floor(hoursAgo / 24);
      const date = (hoursAgo, daysAgo) => {
        if (hoursAgo <= 24 && hoursAgo >= 1) {
          return <h3 id="created">Created {hoursAgo} hours ago.</h3>;
        } else if (hoursAgo < 1) {
          let minutes = hoursAgo / 60;
          return <h3 id="created">Created {minutes} minutes ago.</h3>;
        } else {
          return <h3 id="created"> Created {daysAgo} days ago</h3>;
        }
      };

      return (
        <div className="post">
          <Link
            to={`/post/${post.id}`}
            style={{ textDecoration: 'none', color: 'black' }}
            key={post.id}
          >
            {date(hoursAgo, daysAgo)}
            <h2 className="title">{post.Title}</h2>
            <h3 className="votes">{post.up_votes} upvotes</h3>
          </Link>
        </div>
      );
    });
  };

  return (
    <div>
      <Navbar />
      <div className="post-container">{display(posts)}</div>
    </div>
  );
};

export default Home;
