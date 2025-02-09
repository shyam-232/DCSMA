import React, { useEffect, useState } from 'react';

const Posts = ({ contract }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    setLoading(true);
    if (contract) {
      const postCount = await contract.methods.postCount().call();
      const allPosts = [];
      for (let i = 1; i <= postCount; i++) {
        const post = await contract.methods.posts(i).call();
        allPosts.push(post);
      }
      setPosts(allPosts);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, [contract]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Posts</h2>
      <button
        className="bg-blue-500 hover:cursor-pointer hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
        onClick={fetchPosts}
      >
        Refresh Posts
      </button>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {posts.map((post, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg p-4">
              <p className="text-gray-700">Content: {post.content}</p>
              <p className="text-gray-500 text-sm">Author: {post.author}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Posts;
