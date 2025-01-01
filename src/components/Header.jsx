import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../ThemeContext';
import { Sun, Moon } from 'lucide-react';

const Header = () => {
    const { isDarkMode, toggleTheme } = useTheme();
    const [isCategoriesMenuOpen, setCategoriesMenuOpen] = useState(false);
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const closeTimeoutRef = useRef(null);

    const handleMouseEnter = () => {
        clearTimeout(closeTimeoutRef.current); 
        setCategoriesMenuOpen(true); 
    };

    const handleMouseLeave = () => {
        closeTimeoutRef.current = setTimeout(() => {
            setCategoriesMenuOpen(false); 
        }, 300); 
    };


    const categories = ['Fiction', 'Science', 'History', 'Biography', 'Technology', 'Adult', 'Kids', 'New', 'Novels'];

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-md ${isDarkMode ? 'bg-black/80 border-gray-900' : 'bg-white/80 border-gray-200'
                }`}
        >
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-8">
                <div className="flex justify-between items-center">

                    <div className={`font-bold text-xl ${isDarkMode ? 'text-white' : 'text-black'}`}>
                        <Link to="/">Google Books</Link>
                    </div>

                    <div className="hidden md:flex items-center space-x-10">
                        <div className="hidden md:flex items-end space-x-10">
                            <Link
                                to="/"
                                className={`text-base font-semibold hover:scale-105 transition-all ${isDarkMode ? 'text-white hover:text-yellow-500' : 'text-gray-700 hover:text-black'
                                    }`}
                            >
                                Home
                            </Link>
                            <div
                                className="relative"
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                            >
                                <button
                                    className={`text-base font-semibold hover:scale-105 transition-all ${isDarkMode ? 'text-white hover:text-yellow-500' : 'text-gray-700 hover:text-black'
                                        }`}
                                >
                                    Categories
                                </button>

                                {isCategoriesMenuOpen && (
                                    <div
                                        className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg p-2 grid grid-cols-2"
                                        onMouseEnter={handleMouseEnter} 
                                        onMouseLeave={handleMouseLeave} 
                                    >
                                        {categories.map((category, index) => (
                                            <Link
                                                key={index}
                                                to={`/categories/${category.toLowerCase()}`}
                                                className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                                            >
                                                {category}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <Link
                                to="/about"
                                className={`text-base font-semibold hover:scale-105 transition-all ${isDarkMode ? 'text-white hover:text-yellow-500' : 'text-gray-700 hover:text-black'
                                    }`}
                            >
                                About
                            </Link>
                        </div>

                        
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={toggleTheme}
                                className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-200 hover:bg-white' : 'bg-white hover:bg-gray-700'
                                    }`}
                            >
                                {isDarkMode ? <Sun className="h-3 w-3" /> : <Moon className="h-3 w-3" />}
                            </button>
                        </div>
                    </div>


                    
                    <button
                        className="md:hidden"
                        aria-label="Toggle Mobile Menu"
                        onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        <svg
                            className={`h-6 w-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </button>
                </div>


                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden mt-4 pb-4 space-y-4">
                        <Link
                            to="/"
                            className={`block px-4 py-2 rounded ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-black'
                                }`}
                        >
                            Home
                        </Link>
                        <button
                            onClick={() => setCategoriesMenuOpen(!isCategoriesMenuOpen)}
                            className={`block px-4 py-2 text-left rounded ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-black'
                                }`}
                        >
                            Categories
                        </button>
                        {isCategoriesMenuOpen && (
                            <div className="pl-8 grid grid-cols-2 gap-2">
                                {categories.map((category, index) => (
                                    <Link
                                        key={index}
                                        to={`/categories/${category.toLowerCase()}`}
                                        className={`py-2 rounded ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'
                                            }`}
                                    >
                                        {category}
                                    </Link>
                                ))}
                            </div>
                        )}
                        <Link
                            to="/about"
                            className={`block px-4 py-2 rounded ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-black'
                                }`}
                        >
                            About
                        </Link>
                    </div>
                )}
            </nav>
        </header >
    );
};

export default Header;
