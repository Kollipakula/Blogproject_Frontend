import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editBlogId, setEditBlogId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get('https://blog-project-3-a6uy.onrender.com/api/blogs', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setBlogs(response.data);
    } catch (error) {
      console.error('Error fetching blogs:', error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://blog-project-3-a6uy.onrender.com/api/blogs/${id}`, {
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
    setShowForm(true);
  };

  const handleCreateOrUpdate = async (e) => {
    e.preventDefault();

    try {
      if (editMode) {
        await axios.put(`https://blog-project-3-a6uy.onrender.com/api/blogs/${editBlogId}`, { title, content }, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
      } else {
        await axios.post('https://blog-project-3-a6uy.onrender.com/api/blogs', { title, content }, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
      }
      setTitle('');
      setContent('');
      setEditMode(false);
      setEditBlogId(null);
      setShowForm(false);
      fetchBlogs(); // Refresh the list after creating or updating
    } catch (error) {
      console.error('Error creating or updating blog:', error.message);
      if (error.response) {
        console.error('Response data:', error.response.data);
      }
    }
  };

  return (
    <>
      <div className="bg-gradient-to-r from-violet-200 to-pink-200 min-h-screen flex">
        <nav className="bg-gradient-to-r from-violet-200 to-pink-200 shadow-md w-1/5">
          <div className="h-screen flex flex-col justify-between">
            <div>
              <div className="py-4 text-center text-lg font-bold text-gray-800">Blog Website</div>
              <ul className="mt-6 space-y-2">
                <li>
                  <Link to="/" className="block text-gray-800 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/login" className="block text-gray-800 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium">
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/register" className="block text-gray-800 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium">
                    Sign Up
                  </Link>
                </li>
              </ul>
              <div className="mt-6 px-3">
                <h3 className="text-lg font-bold text-gray-800">Your Blogs</h3>
                <ul className="mt-4 space-y-2">
                  {blogs.map(blog => (
                    <li key={blog._id}>
                      <button
                        onClick={() => handleEdit(blog._id)}
                        className="block text-left text-gray-800 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium w-full"
                      >
                        {blog.title}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </nav>

        <div className="flex-1 min-h-screen bg-gradient-to-r from-violet-200 to-pink-200 flex flex-col justify-start items-center pt-8">
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4 focus:outline-none focus:shadow-outline"
          >
            Create Blog +
          </button>
          {showForm && (
            <form onSubmit={handleCreateOrUpdate} className="max-w-lg mx-auto bg-white rounded-lg overflow-hidden shadow-lg p-6 mb-4 mt-4">
              <h2 className="text-3xl mb-4">{editMode ? 'Edit' : 'Create'} Your Blog</h2>
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
                  {editMode ? 'Update' : 'Create'} Post
                </button>
              </div>
            </form>
          )}

          <ul className="max-w-4xl mx-auto flex flex-wrap mt-8">
            {blogs.map(blog => (
              <li key={blog._id} className="flex-grow p-2">
                <div className="bg-white rounded-lg overflow-hidden shadow-lg p-6 mb-4 w-full">
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
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
