import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editBlogId, setEditBlogId] = useState(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/blogs', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setBlogs(response.data);
    } catch (error) {
      console.error('Error fetching blogs:', error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/blogs/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      fetchBlogs(); // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting blog:', error.message);
    }
  };

  const handleEdit = (id) => {
    const blog = blogs.find((blog) => blog._id === id);
    setTitle(blog.title);
    setContent(blog.content);
    setEditMode(true);
    setEditBlogId(id);
  };

  const handleCreateOrUpdate = async (e) => {
    e.preventDefault();

    try {
      if (editMode) {
        await axios.put(`http://localhost:5000/api/blogs/${editBlogId}`, { title, content }, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
      } else {
        await axios.post('http://localhost:5000/api/blogs', { title, content }, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
      }
      setTitle('');
      setContent('');
      setEditMode(false);
      setEditBlogId(null);
      fetchBlogs(); // Refresh the list after creating or updating
    } catch (error) {
      console.error('Error creating or updating blog:', error.message);
      if (error.response) {
        console.error('Response data:', error.response.data);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-violet-200 to-pink-200 flex flex-col justify-center items-center">
      <form onSubmit={handleCreateOrUpdate} className="max-w-lg mx-auto bg-white rounded-lg overflow-hidden shadow-lg p-6 mb-4">
        <h2 className="text-3xl mb-4">Create or Edit Blog</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="border border-gray-300 rounded-lg py-2 px-4 w-full h-32 resize-none focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="text-right">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {editMode ? 'Update' : 'Create'} Blog
          </button>
        </div>
      </form>

      <ul className="max-w-lg mx-auto">
        {blogs.map(blog => (
          <li key={blog._id} className="bg-white rounded-lg overflow-hidden shadow-lg p-6 mb-4">
            <h3 className="text-xl mb-2">{blog.title}</h3>
            <p className="mb-2">{blog.content}</p>
            <div className="text-right">
              <button
                onClick={() => handleDelete(blog._id)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded mr-2 focus:outline-none focus:shadow-outline"
              >
                Delete
              </button>
              <button
                onClick={() => handleEdit(blog._id)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
              >
                Edit
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
