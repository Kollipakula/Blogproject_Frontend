import React from 'react';
import { Link } from 'react-router-dom';


const Home = () => {
    return (
        <div className="bg-gradient-to-r from-violet-200 to-pink-200 min-h-screen" >
            {/* Navbar */}
            <nav className="bg-gradient-to-r from-violet-200 to-pink-200 shadow-md">
                <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                    <div className="relative grid grid-cols-3 gap-4 items-center h-16">
                        {/* Logo */}
                        <div className="col-span-1">
                            <span className="text-lg font-bold text-gray-800">Blog Website</span>
                        </div>
                        {/* Empty Center Placeholder */}
                        <div className="col-span-1"></div>
                        {/* Navigation Links */}
                        <div className="col-span-1 flex justify-end space-x-4">
                            <Link to="/" className="text-gray-800 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium">Home</Link>
                            <Link to="/login" className="text-gray-800 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium">Login</Link>
                            <Link to="/register" className="text-gray-800 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium">Sign Up</Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="py-20">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-4xl font-extrabold text-white">Welcome To Our Blog Website</h1>
                        <p className="mt-3 text-lg text-white">Here you can create and share your thoughts.</p>
                    </div>
                    <div className="mt-10 flex justify-center">
                        <Link to="/login" className="text-white bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-lg text-lg font-semibold">Login</Link>
                        <Link to="/register" className="ml-4 text-gray-800 bg-gray-300 hover:bg-gray-400 px-6 py-3 rounded-lg text-lg font-semibold">Sign Up</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
