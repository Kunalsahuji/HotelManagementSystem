import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const NotFound = () => {
    const location = useLocation()
    console.log(location.pathname)
    return (
        <div className="text-center mt-24 font-sans">
            <h1 className="text-6xl text-red-600">404 - Not Found</h1>
            <p className="text-xl text-gray-800 mt-4">Sorry, the page you are looking for does not exist.</p>
            <Link to="/" className="inline-block mt-6 px-6 py-3 bg-blue-500 text-white no-underline rounded hover:bg-blue-700">
                Go to Home
            </Link>
        </div>
    );
};

export default NotFound;