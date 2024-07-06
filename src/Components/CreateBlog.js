// CreateBlog.js

import React, { useState } from 'react';
import axios from 'axios';

const CreateBlog = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(
                'http://localhost:5000/api/blogs',
                { title, content }
            );
            setTitle('');
            setContent('');
            setErrorMessage('');
            alert('Blog created successfully!');
        } catch (error) {
            console.error('Error creating blog:', error);
            setErrorMessage('An error occurred. Please try again.');
        }
    };

    return (
        <div>
            <h2>Create a New Blog</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div>
                    <label>Content:</label>
                    <textarea value={content} onChange={(e) => setContent(e.target.value)} required></textarea>
                </div>
                <button type="submit">Create Blog</button>
            </form>
            {errorMessage && <p>{errorMessage}</p>}
        </div>
    );
};

export default CreateBlog;
